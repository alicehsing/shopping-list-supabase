//loop through those items, create DOM elements, and append -- render items differently if "bought: true"
export function renderItem(item) {
    const itemEl = document.createElement('div');
    const itemP = document.createElement('p');
    const imgBin = document.createElement('img');
    const imgAdd = document.createElement('img');

    itemP.textContent = `${item.quantity} ${item.item}`;
    imgBin.src = '../assets/bin.png';
    imgAdd.src = '../assets/add-icon.png';
    itemEl.append(itemP);

    if (item.bought) {
        itemEl.classList.add('bought');
        itemEl.append(imgAdd);
        
    } else {
        itemEl.classList.add('not-bought');
        itemEl.append(imgBin);
    }

    return itemEl;
}