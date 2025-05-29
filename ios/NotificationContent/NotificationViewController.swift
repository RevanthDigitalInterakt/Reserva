//
//  NotificationViewController.swift
//  NotificationContent
//
//  Created by Guest123 on 29/05/25.
//

import UIKit
import UserNotifications
import UserNotificationsUI
import MoEngageRichNotification

class NotificationViewController: UIViewController, UNNotificationContentExtension {

    @IBOutlet var label: UILabel?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any required interface initialization here.
      
      MoEngageSDKRichNotification.setAppGroupID("group.com.reserva.moengage")
      
      
      
    }
    
    func didReceive(_ notification: UNNotification) {
        self.label?.text = notification.request.content.body
      
      MoEngageSDKRichNotification.addPushTemplate(toController: self, withNotification: notification)
    }

}
