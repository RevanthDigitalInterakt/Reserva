Feature: Login
  As an owner would like to log in to the booking app
  to access my account

  Scenario: successful login
    Given that the user accesses the login screen
    When all login information is present correctly
    Then the user should be directed to the logged in area

  Scenario: Login failed
    Given that the user accesses the login screen
    When login information is applied incorrectly
    Then the user will see the error message "Check the fields above and enter a valid email or password"

  Scenario: Forgot my password
    Given that the user clicked on Forgot my password
    When enter email and click send e-mail
    Then the email must be sent
  
  Scenario: Reset password
    Given that the user has received the change code in the email
    When input the received code and new password correctly
    Then the new password must be registered successfuly

  Scenario: Reset password with failed code
    Given that the user has received the change code in the email
    When entering invalid received code
    Then the message "Please enter a valid code" should be displayed

  Scenario: Reset password failed
    Given that the user has received the change code in the email
    When entering the code and an invalid password
    Then can't save the new password