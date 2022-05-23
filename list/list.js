import { checkAuth, createListItem, logout } from '../fetch-utils.js';

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