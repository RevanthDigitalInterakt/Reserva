import UIKit
import Foundation
import Lottie
import React

@objc class Dynamic: NSObject {

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
    let animationView = AnimationView(name: lottieName)
    let container = AnimationView(name: lottieName)
    

    
//    animationView.layoutMargins = UIEdgeInsets(top:0,left:64,bottom:0,right:64);
//    rootView.layoutMargins = UIEdgeInsets(top:0,left:64,bottom:0,right:64);
//    animationView.frame = CGRect(x:0, y:0, width:285, height: 45)//rootView.frame
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.backgroundColor = UIColor.black
    
//    rootView.backgroundColor = UIColor.black
    
    return animationView;
  }

  @objc func play(animationView: AnimationView) {
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
