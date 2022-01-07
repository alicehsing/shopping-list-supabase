/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const SUPABASE_URL = 'https://knhiasotugxozbbkbqrw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNzkzMywiZXhwIjoxOTU1MDgzOTMzfQ.EBPUcU_WWpLifNiYHK0-7lDB2fZtodlhB2Yb7rOSIek';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createItem(newItem, newQuantity) {
    const response = await client
        .from('shopping_list')
        .insert([
            { 
                item: newItem, 
                quantity: newQuantity, 
                bought: false 
            }
        ]);

    return checkError(response);
}

export async function deleteAllItems() {
    const response = await client
        .from('shopping_list')
        .delete();
    
    return checkError(response);
}

export async function getItems() {
    const response = await client 
        .from('shopping_list')
        .select()
        .order('bought', { descending: false });
    
    return checkError(response);
}

//set bought:false to bought:true for an particular item
//use its unique id in supabase
export async function buyItem(someId) {
    const response = await client
        .from('shopping_list')
        .update({ bought: true })
        .match({ id: someId });
    
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
