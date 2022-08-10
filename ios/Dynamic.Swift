import UIKit
import Foundation
import Lottie
import React

@objc class Dynamic: NSObject {

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
    let animationView = AnimationView(name: lottieName)

    animationView.frame = rootView.frame
    animationView.contentMode = .center
    animationView.currentFrame = 49
    animationView.backgroundColor = UIColor.black
    
    return animationView;
  }

  @objc func play(animationView: AnimationView) {
    animationView.play(
      fromFrame: 49,
      toFrame: 165,
      loopMode: LottieLoopMode.playOnce,
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
