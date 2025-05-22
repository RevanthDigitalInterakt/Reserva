package com.usereserva;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactActivity;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import java.net.URL;
import com.usereserva.DeepLinkPath;
import android.app.Activity;


public class DeepLinkPathModule extends ReactContextBaseJavaModule {
   DeepLinkPathModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "DeepLinkPathModule";
   }

   @ReactMethod
   public void openUrlInBrowser(String url, Boolean closeCurrentAppInstance) {
        if(!this.isValidUrl(url)) return;

        try {
            Activity currentActivity = this.getCurrentActivity();
            if (currentActivity instanceof ReactActivity) {
                ReactActivity reactActivity = (ReactActivity) currentActivity;
                DeepLinkPath deepLinkPath = new DeepLinkPath(reactActivity);

                deepLinkPath.openInBrowser(url);

                if(closeCurrentAppInstance) {
                    deepLinkPath.closeCurrentInstanceApp();
                }
            }
        } catch (Exception e) {
            return;
        }
   }

    private boolean isValidUrl(String url) {
           try {
              new URL(url).toURI();
              return true;
           } catch (Exception e) {
              return false;
           }
      }
}