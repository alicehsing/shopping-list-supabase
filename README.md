## HTML Setup
 -a form with:
  1)a number input
  2)a text input
  3)an add new item button
-delete list button
-"destination div" to inject our list items into

## Events
1.on load
  -fetch and display user's existing list items
    -call supabase to fetch all shopping items for this user
    -loop through those items, create DOM elements, and append -- render items differently if "bought: true"
2.submit 'add item' form
  -add the new item and quantity to the list
    -send the new item to supabase and create a new row
    -clear out the old list
    -fetch the list again
    -loop through those items, create DOM elements, and append -- render items differently if "bought: true"
3.user clicks "2 pounds of flour"
  -"2 pounds of flour" counts as "bought" and is crossed out from the list
    -update 'bought' to true in the database
    -clear out the old list
    -fetch the list again
    -loop through those items, create DOM elements, and append -- render items differently if "bought: true"
4.on click delete list button
  -redisplay all items (which should ne an empty list now)