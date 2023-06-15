Feature: Bag
  As a user, I would like to add products to the bag to complete the purchase

  Scenario: Empty bag
    Given that the user is on the home page
    When you click on the bag symbol and it is empty
    Then he sees the message "Your bag is empty. Browse our app and discover products that are just like you!"

  Scenario: Go shopping
    Given that the user is in the empty bag
    When clicking "Go Shopping"
    Then you are directed to the Promotions Page