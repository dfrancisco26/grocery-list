const SUPABASE_URL = 'https://edanuxzgkcleuccdeakc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYW51eHpna2NsZXVjY2RlYWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzNjg3OTMsImV4cCI6MTk2Nzk0NDc5M30.HH23nUpy7jCA4AgRRgpIk8M-fwc5zqvBLuE1Muk_lps';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./list');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}


export async function createListItem(item, qty) {
    const response = await client.from('groceries').insert({ item, qty });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function fetchListItems() {
    const response = await client.from('groceries').select('*').order('item');

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export function renderItem(item) {
    const div = document.createElement('div');
    div.textContent = `${item.qty} ${item.name}`;

    if (item.purchased) {
        div.classList.add('complete');
    }
    return div;
}
// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
