Feature: Favorites menu
  As a user, I would like to access products added to "Favourites"

  Scenario: Favorites logged in
    Given that the user is in the Menu
    When he clicks on "Favorites" and is already logged in
    Then it visualizes the favorite products

  Scenario: Favorites logged out
    Given that the user is in the Menu
    When he clicks "Favorites" and is not logged in
    Then he can login to view favorite products

  Scenario: Empty favorites
    Given that the user is in the Menu
    When he clicks "Favorites" and has no products added
    Then he will have the option to "Browse" which will direct him to the Home of the app

  Scenario: Favorites with product
    Given that the user is in the Menu
    When he clicks on "Favorites" and visualizes the favorited products
    Then he will have the option of "Buy now" which will add the product to the bag