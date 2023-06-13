Feature: Account Access Menu
  As a user, I would like to login to my account

  Scenario: Access Account
    Given that the user is in the Menu
    When he is logged out and click on "Access Account"
    Then he can login and access his information

  Scenario: Login failed
    Given that the user is in the Menu
    When he is logged out and click on "Access Account"
    Then if he enters any incorrect login information he will see the following message "Check the fields above and enter a valid email or password"

  Scenario: Register
    Given that the user is in the Menu
    When he is logged out because he does not have a record
    Then he can click on "Access Account" and make a new registration
