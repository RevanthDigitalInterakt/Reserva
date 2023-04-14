package com.usereserva;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.usereserva.BuildConfig;
import android.content.ComponentName;
import android.content.pm.PackageManager;
import android.net.Uri;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.OutputStream;
import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;
import android.os.Build;
import android.os.Build.VERSION_CODES;
import java.util.UUID;

public class DeepLinkPath {

    private ReactActivity reactActivity;
    private String GatewayUrl = BuildConfig.URL_GATEWAY_CLIENT;
    private String GatewayApiKey = BuildConfig.API_KEY_GATEWAY;

    public DeepLinkPath(ReactActivity reactActivity) {
        this.reactActivity = reactActivity;
    }

    public void init(Intent currentIntent) {
        this.verifyIntentAction(currentIntent);

    }

    private void verifyIntentAction(Intent currentIntent) {
        if(currentIntent != null && Intent.ACTION_VIEW.equals(currentIntent.getAction())) {
            String deepLinkURI = currentIntent.getDataString();
            this.getDeepLinkPathInContentful(deepLinkURI);
        }
    }

    private void getDeepLinkPathInContentful(String deepLink) {
        new Thread(() -> {
            try {
                URL url = new URL(this.GatewayUrl);
                UUID uuid = UUID.randomUUID();

                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");

                connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                connection.setRequestProperty("x-api-key", this.GatewayApiKey);
                connection.setRequestProperty("x-transaction-id", uuid.toString());

                OutputStream outputStream = connection.getOutputStream();
                outputStream.write(this.generateGraphQlQuery(deepLink).getBytes("UTF-8"));
                outputStream.close();

                // Obtém o código de resposta da requisição
                int responseCode = connection.getResponseCode();

                // Obtém a resposta da requisição
                InputStream inputStream;
                if (responseCode < HttpURLConnection.HTTP_BAD_REQUEST) {
                    inputStream = connection.getInputStream();
                } else {
                    inputStream = connection.getErrorStream();
                }
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                String inputLine;
                StringBuilder response = new StringBuilder();
                while ((inputLine = bufferedReader.readLine()) != null) {
                    response.append(inputLine);
                }
                bufferedReader.close();

                try {
                    JSONObject jsonResponse = new JSONObject(response.toString());
                    JSONObject deeplinkPath = (jsonResponse.getJSONObject("data")).getJSONObject("deeplinkPath");

                    if(deeplinkPath != null) {
                        String active = deeplinkPath.getString("active");
                        if(active == null) {
                            connection.disconnect();
                            return;
                        }

                        // Se active for false, ele deve abrir o deepLink no novagador do usuario
                        if(!Boolean.parseBoolean(active)) {
                            this.openInBrowser(deepLink);
                            connection.disconnect();
                            this.closeCurrentInstanceApp();
                        }
                    }
                    connection.disconnect();
                } catch (JSONException e) {
                    connection.disconnect();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    private String generateGraphQlQuery(String deepLink) {
        return "{\n" +
                "    \"operationName\": null,\n" +
                "    \"variables\": {\n" +
                "        \"path\": \"" + deepLink + "\"\n" +
                "    },\n" +
                "    \"query\": \"query deeplinkPath($path: String!) { deeplinkPath(input: { path: $path }) { path referenceId active } }\"\n" +
                "}";
    }


    /**
     * Fecha todas as instancias do app da reserva.
     * Deixando somente o na navegador usuario aberto.
     */
    public void closeCurrentInstanceApp() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            this.reactActivity.finishAndRemoveTask();
        } else {
            this.reactActivity.finishAffinity();
        }
        System.exit(0);
    }

    /**
    * Deve fazer o toogle, desabilitando e habilitando o deepLink do app.
    * Com isso conseguimos fazer o launcher de uma nova Intent com o navegador do usuario
    * para abrir determinada url, em seguida é reativado o deepLink do pacote reserva.
    * */
    public void openInBrowser(String url) {
        setDeepLinkingState(PackageManager.COMPONENT_ENABLED_STATE_DISABLED);

        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        this.reactActivity.startActivity(intent);

        setDeepLinkingState(PackageManager.COMPONENT_ENABLED_STATE_ENABLED);
    }

    /**
    * Seta um estado do deepLink para uma activity.
    * No futuro se o nome da activity mudar,ou for passar essa logica de deepLink para outra activity
    * trocar onde tem .MainActivity para o nome da activity atual
    * */
    private void setDeepLinkingState(int state) {
        ComponentName compName = new ComponentName(this.reactActivity.getPackageName(), this.reactActivity.getPackageName() + ".MainActivity");
        this.reactActivity.getApplicationContext().getPackageManager().setComponentEnabledSetting(compName, state, PackageManager.DONT_KILL_APP);
    }
}