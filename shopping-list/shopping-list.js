import { 
    checkAuth,
    logout,
    createItem,
    getItems,
    buyItem,
    deleteAllItems,
} from '../fetch-utils.js';

import { renderItem } from '../render.utils.js';

checkAuth();

//grab DOM
const itemForm = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete');
const listEl = document.querySelector('.item-list');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    await displayShoppingListItems();
});


itemForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(itemForm);
    const item = data.get('item');
    const quantity = data.get('quantity');

    // send the new item to supabase and create a new row
    await createItem(item, quantity);
    //reset the form
    itemForm.reset();
    //fetch and display the item
    await displayShoppingListItems();

});

deleteButton.addEventListener('click', async() => {
    await deleteAllItems();
    await displayShoppingListItems();
});

async function displayShoppingListItems() {
    //fetch all shopping items for this user
    const items = await getItems();

    listEl.textContent = '';
    // loop through these item list array
    //display the list of items
    for (let item of items) {
        const newItemEl = renderItem(item);
        listEl.append(newItemEl);
        //when user clicks a display item
        if (!item.bought) {
            newItemEl.addEventListener('click', async() => {
                //update 'bought' to true in the database
                await buyItem(item.id);
                //clear out the old list, fetch the list again, and render 
                displayShoppingListItems();
            
            });
        }
    }
}