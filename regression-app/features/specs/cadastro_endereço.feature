  Feature: Address Register
  As a user, I would like to register my address

  Scenario: Register logged in
    Given that the user is logged in and clicks on Profile
    When clicking on My Addresses
    Then you can register a new address
  
  Scenario: Log out registration
    Given the user is logged out and clicks on profile
    When logging in and being directed to home
    Then you should click on Profile again to register the address

  Scenario: New address
    Given that the user is on the My Addresses page
    When clicking on New Address
    Then you can fill in the correct address information and click Add Address

  Scenario: Edit Address
    Given that the user is on the My Addresses page
    When you already have a registered address
    Then you can click Edit and update the information

  Scenario: Delete address
    Given that the user is on the My Addresses page
    When you already have a registered address
    Then you can click Delete and delete the registered address

  Scenario: New address with incorrect name
    Given that the user is adding a new address
    When filling with an invalid name
    Then you will see the message "Please enter the recipient's full name"
  
  Scenario: New address with incorrect zip code
    Given that the user is adding a new address
    When filling in an invalid zip code
    Then you will see an error message in the fields of: Address, District, Number, State, City
  
