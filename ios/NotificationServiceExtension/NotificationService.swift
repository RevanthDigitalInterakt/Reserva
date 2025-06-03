//
//  NotificationService.swift
//  NotificationServiceExtension
//
//  Created by Guest123 on 02/06/25.
//

import UserNotifications
import MoEngageRichNotification
import OneSignalExtension

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var receivedRequest: UNNotificationRequest!
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
     if let _ = request.content.userInfo["moengage"] {
                  self.contentHandler = contentHandler
                  bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
                  MoEngageSDKRichNotification.setAppGroupID("group.com.reserva.moengage")
                  MoEngageSDKRichNotification.handle(richNotificationRequest: request, withContentHandler: contentHandler)
     } else {
       
       
       
       self.receivedRequest = request
       self.contentHandler = contentHandler
       self.bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
       
      OneSignalExtension.didReceiveNotificationExtensionRequest(self.receivedRequest, with: bestAttemptContent, withContentHandler: self.contentHandler)
       
       
       
     }
      
      
      
      
        
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
          
          
          
          OneSignalExtension.serviceExtensionTimeWillExpireRequest(self.receivedRequest, with: self.bestAttemptContent)
          contentHandler(bestAttemptContent)
          
          
        }
    }

}
