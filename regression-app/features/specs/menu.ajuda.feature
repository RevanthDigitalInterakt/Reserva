Feature: Help Center Menu
  As a user, I would like to access a page where I can ask questions about the app's services.

  Scenario: Help center
    Given that the user is in the "Help Center"
    When he clicks "Help Center"
    Then he sees several help options in the app