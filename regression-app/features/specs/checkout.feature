Feature: Checkout
  As a user, I would like to complete my purchase after adding the products to the bag

  Scenario: Delivery
    Given that the user is on the delivery page and is already logged in
    When he add a new address or edit the address already registered
    Then he can proceed to "Payment Method"

  Scenario: Withdraw in store
    Given that the user wants to pick up the product in the store and is already logged in
    When he adds a new address or edits the address already registered and clicks on "Pick up in store"
    Then he can view the nearest store for pickup and proceed to "Payment Method"

  Scenario: Delivery logged out
    Given that the user clicks on "Go to Delivery" but is not logged in
    When he logs in or creates a new account
    Then it can proceed to the delivery

  Scenario: Payment
    Given that the user is on the payment page
    When he selects the desired payment method
    Then he can proceed to "Finalize Payment"