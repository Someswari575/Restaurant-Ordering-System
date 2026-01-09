1.Project Overview
This project is a browser-based Restaurant Ordering System developed using HTML, CSS, JavaScript, and Bootstrap. It enables users to add menu items to an order, dynamically adjust quantities, remove items, calculate totals, and data is stored locally using the browser's local storage.
2. Key Features
 Click-to-add menu items
 Dynamic quantity adjustment (increase/decrease)
 Search filter for menu items
 Real-time total calculation
 Remove items from order
 Clear all orders
 Persistent order state via localStorage
 3. Technologies Used
 HTML for structure
 CSS and Bootstrap for responsive styling
 JavaScript for logic and interactivity
 Browser localStorage for data persistence
 
4 JavaScript Functions
 calculateTotal(): Calculates the sum of all items based on quantity and price.
 updateTotal(): Updates the total display element with calculated value.
 addToOrderList(name, price, quantity): Creates and appends a list item to the order summary.
 loadOrder(): Loads all current order items from localStorage and renders them.
 Event Listeners:
   • Menu click: Adds or increases item quantity.
   • Summary click: Handles item quantity changes and removal.
   • Search input: Filters displayed menu items based on input.
   • Clear button: Resets the order and localStorage.
5. User Interface (UI)
The UI is structured into the following sections:
 Search bar to filter menu items
 Menu categories (Starters, Main Course, Desserts)
 Order Summary list with interactive controls
 Display for total amount and action buttons
6. Usage Instructions
1. Open the HTML file in a browser.
2. Click on any menu item to add it to the order.
3. Use '+' or '-' to increase or decrease item quantities.
4. Click '×' to remove items from the order.
5. View the live-updated total at the bottom.
6. Click 'Clear Order' to empty the cart.
7. Conclusion
The Restaurant Ordering System provides a simple yet functional interface for managing orders in a restaurant context. Its responsive design and persistent data handling make it suitable for small-scale ordering use-cases or practice projects.
