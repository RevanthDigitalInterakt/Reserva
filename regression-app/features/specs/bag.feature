Feature: Bag
  As a user, I would like to add products to the bag to complete the purchase

@emptybag
  Scenario: Empty bag
    Given that the user is on the home page
    When you click on the bag symbol and it is empty
    Then he sees the message "Your bag is empty. Browse our app and discover products that are just like you!"

@goshpping
  Scenario: Go shopping
    Given that the user is in the empty bag
    When clicking "Go Shopping"
    Then you are directed to the Promotions Page
    
 @addproduct 
  Scenario: Add product to bag
    Given that the user is in PDP
    When click on "Add to bag"
    Then the user can click on the bag symbol and view the product

@bagwithproduct
  Scenario: Bag with product   
    Given that the user adds a product to the bag
    When entering the bag and viewing the product
    Then the user can increase or decrease the quantity of the chosen product using the "-" and "+" buttons
