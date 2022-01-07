import { 
    checkAuth,
    logout,
    createItem,
    getItems,
    buyItem,
    deleteAllItems,
    unBuyItem,
} from '../fetch-utils.js';

import { renderItem } from '../render.utils.js';

checkAuth();


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
                //update supabse 'bought' column to 'true'
                await buyItem(item.id);
                //clear out the old list, fetch the list again, and render 
                displayShoppingListItems();
            });
        }
        // *stretch goal: Allow users to un-buy items they accidentally checked-off.
        if (item.bought) {
            newItemEl.addEventListener('click', async() => {
                //update supabase 'bought' column to 'false
                await unBuyItem(item.id);
                displayShoppingListItems();
            });
        }
    }
}

//stretch goal: set countdown timer. Give shopping list items a due date, and tell the user how long they have to buy each item. If a shopping list item is past its due date, style it differently.

//set the future date/time we are counting down to
const countDownTime = new Date('Jan 07 2023 15:00:00').getTime();
//update the count down every 1 second
let x = setInterval(function() {
    //get today's date and time
    let now = new Date().getTime();
    //find the distance between now and the count down date
    let distance = countDownTime - now;
    // time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //display the result in the element with id="demo"
    const countDown = document.getElementById('count-down-time');
    countDown.textContent = days + 'd  ' + hours + 'h  '
    + minutes + 'm  ' + seconds + 's  ';
    // if the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        countDown.textContent = 'Your list is EXPIRED!';
        itemForm.classList.add('time-out');
        listEl.classList.add('time-out');
    }
}, 1000);
