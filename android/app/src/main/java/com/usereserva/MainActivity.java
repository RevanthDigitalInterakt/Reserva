package com.usereserva;

import com.facebook.react.ReactActivity;
import android.content.Intent;
// splash screen
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.usereserva.DeepLinkPath;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reserva";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      RNBootSplash.init(this);
      super.onCreate(null);
      DeepLinkPath deepLinkPath = new DeepLinkPath(this);
      deepLinkPath.init(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      setIntent(intent);
      DeepLinkPath deepLinkPath = new DeepLinkPath(this);
      deepLinkPath.init(intent);
  }
}
