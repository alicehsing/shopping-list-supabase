//loop through those items, create DOM elements, and append -- render items differently if "bought: true"
export function renderItem(item) {
    const itemEl = document.createElement('div');
    const itemP = document.createElement('p');
    const img = document.createElement('img');

    if (item.bought) {
        itemEl.classList.add('bought');
    } else {
        itemEl.classList.add('not-bought');
    }
    itemP.textContent = `${item.quantity} ${item.item}`;
    img.src = '../assets/bin.png';
    itemEl.append(itemP, img);
    return itemEl;
}