import { checkAuth, createListItem, renderItem, togglePurchased, fetchListItems, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('grocery-form');
const listElem = document.getElementById('grocery-list');
const error = document.getElementById('error');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemData = new FormData(form);
    const data = await createListItem(itemData.get('item'), itemData.get('qty'));
    if (data) {
        window.location.reload(true);
    } else {
        error.textContent = 'Something went wrong :(';
    }

});

async function displayListItems() {
    listElem.textContent = '';
    const data = await fetchListItems();
    if (data) {
        for (let item of data) {
            const itemElem = renderItem(item);
            itemElem.addEventListener('click', async (e) => {
                e.preventDefault();
                await togglePurchased(item);
                displayListItems();
            });
            listElem.append(itemElem);
        }
    }
}

displayListItems();