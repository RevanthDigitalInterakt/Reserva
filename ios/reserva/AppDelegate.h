#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <AppsFlyerLib/AppsFlyerLib.h>
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, AppsFlyerLibDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
