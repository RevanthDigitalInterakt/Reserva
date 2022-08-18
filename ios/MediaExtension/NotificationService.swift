//
//  NotificationService.swift
//  MediaExtension
//
//  Created by Danilo  Machado on 11/08/22.
//

import UserNotifications
import PIOMediaAttachmentExtension

class NotificationService: PIOMediaAttachmentServiceExtension {
  
  override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
      super.didReceive(request, withContentHandler: contentHandler)
  }
  
  override func serviceExtensionTimeWillExpire() {
    super.serviceExtensionTimeWillExpire()
  }

}
