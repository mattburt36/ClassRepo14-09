const balance       = document.getElementById('balance');
const money_plus    = document.getElementById('money_plus');
const money_minus   = document.getElementById('money_minus');
const list          = document.getElementById('list');
const form          = document.getElementById('form');
const text          = document.getElementById('text');
const amount        = document.getElementById('amount');

// const dummyData = 
// [
//   { id: 1, text: 'Gas', amount: -25 },
//   { id: 2, text: 'Salary', amount: 18.99 },
//   { id: 3, text: 'Javascript book', amount: -74 },
//   { id: 4, text: 'Car', amount: 2625 }  
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null? localStorageTransactions: [];

// Add Transaction 

function addTransaction(e)
{
    e.preventDefault();

    if(text.value.trim() == ' ' || amount.value.trim == ' ') // Function which eliminates white space (.trim)
    {                                                        // If statement to give error message for not entered 
        alert('Please add a text and an amount');            // for null values entered
    }   
    else
    {
        const transaction =             //--------------------------------------------------------------
    {                                   // Create an object (transaction) containing the text enetered 
            id: generateId(),           // from the website and the number being added to the transaction
            text: text.value,           //--------------------------------------------------------------
            amount: +amount.value,      // Increment the value of the amount entered by default 
        };

        // console.log(transaction)

        transactions.push(transaction); // Push the values added to the form

        addTransactionList(transaction); 

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = ''; 
        
    };

};

// Generate random ID 
function generateId()
{
    return Math.floor(Math.random() * 100000000)
}

// Add transaction to the list

function addTransactionList(transaction)
{
    // Get sign
    const sign = transaction.amount < o? '-' : '+'; // checking the value of the amount and defaulting  
                                                    // to a positive if negative is not chosen 
    const item = document.createElement('li');

    // Add class based on the value of the amount 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    
    item.innerHTML = 
    `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id})">x</button>
    ` // Math.abs is to get rid of the minus sign in the amount property 

    list.appendChild(item);
};

// Update the total card
function updateValues()
{
    const amounts = transactions.map(transaction => transaction.amount) // Looping through transcation and 
                                                                        // creating a new array based on the values passed 
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0).toFixed(2)

    const expense = (amounts
        .filter(item=> < 0)
        .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

        balance.innerText = `$${total}`
        money_plus.innerText = `$${income}`
        money_minus.innerText = `$${expense}`
};

// remove item by id 
function removeItem(id)
{
    transactions = transactions.filter(transaction)
}
