package com.usereserva;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.imagepicker.ImagePickerPackage;
//import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.brentvatne.react.ReactVideoPackage;
//MoEngage
import com.moengage.core.DataCenter;
import com.moengage.core.MoEngage;
import com.moengage.react.MoEInitializer;
import com.moengage.core.config.NotificationConfig;
import com.moengage.core.config.LogConfig;
import com.moengage.core.LogLevel;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = 
  new DefaultReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      packages.add(new DeepLinkPathPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected boolean isNewArchEnabled() {
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    @Override
    protected Boolean isHermesEnabled() {
      return BuildConfig.IS_HERMES_ENABLED;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      DefaultNewArchitectureEntryPoint.load();
    }
    
    MoEngage.Builder moEngage = new MoEngage.Builder(this, "DQ9WFLTADL2Y89Z9OSFUKU0L", DataCenter.DATA_CENTER_2)
    .configureLogs(new LogConfig(LogLevel.VERBOSE, true))
    .configureNotificationMetaData(new NotificationConfig(R.drawable.ic_notificacao, R.drawable.ic_notificacao));
    MoEInitializer.INSTANCE.initializeDefaultInstance(getApplicationContext(), moEngage);
  }
}
