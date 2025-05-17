// Cash box state
let cashBox = {
    notes: {
        500: 0,
        200: 0,
        100: 0,
        50: 0,
        20: 0,
        10: 0
    },
    coins: {
        10: 0,
        5: 0,
        2: 0,
        1: 0
    }
};

// Load data from localStorage on page load
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('cashBoxData');
    if (savedData) {
        cashBox = JSON.parse(savedData);
        // Show appropriate sections based on saved data
        initialSetup.style.display = 'none';
        balanceSection.style.display = 'block';
        giveChange.style.display = 'block';
        restartBtn.style.display = 'block';
        // Update display with saved data
        updateBalanceDisplay();
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('cashBoxData', JSON.stringify(cashBox));
}

// DOM Elements
const initialSetup = document.getElementById('initialSetup');
const addAmount = document.getElementById('addAmount');
const balanceSection = document.getElementById('balanceSection');
const giveChange = document.getElementById('giveChange');
const setInitialAmountBtn = document.getElementById('setInitialAmount');
const addToCashBoxBtn = document.getElementById('addToCashBox');
const calculateChangeBtn = document.getElementById('calculateChange');
const restartBtn = document.getElementById('restartBtn');
const showAddAmountBtn = document.getElementById('showAddAmountBtn');
const closeAddAmountBtn = document.getElementById('closeAddAmount');
const totalAddAmount = document.getElementById('totalAddAmount');
const totalBalance = document.getElementById('totalBalance');
const currentDenominations = document.getElementById('currentDenominations');
const changeResult = document.getElementById('changeResult');
const changeDenominations = document.getElementById('changeDenominations');

// Calculator functionality
const calcDisplay = document.getElementById('calcDisplay');
const calcButtons = document.querySelectorAll('.calc-btn');
const calcEquals = document.getElementById('calcEquals');
const calcClear = document.getElementById('calcClear');
const calcBackspace = document.getElementById('calcBackspace');
const calcApply = document.getElementById('calcApply');

let calcExpression = '';

// Add event listeners for denomination inputs
const addDenominationInputs = [
    'addNote500', 'addNote200', 'addNote100', 'addNote50', 'addNote20', 'addNote10',
    'addCoin10', 'addCoin5', 'addCoin2', 'addCoin1'
];

addDenominationInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateTotalAddAmount);
});

// Add event listeners for received denomination inputs
const receivedDenominationInputs = [
    'receivedNote500', 'receivedNote200', 'receivedNote100', 'receivedNote50', 'receivedNote20', 'receivedNote10',
    'receivedCoin10', 'receivedCoin5', 'receivedCoin2', 'receivedCoin1'
];

receivedDenominationInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateTotalAmountReceived);
});

// Update total amount to add
function updateTotalAddAmount() {
    let total = 0;
    
    // Calculate notes total
    total += parseInt(document.getElementById('addNote500').value || 0) * 500;
    total += parseInt(document.getElementById('addNote200').value || 0) * 200;
    total += parseInt(document.getElementById('addNote100').value || 0) * 100;
    total += parseInt(document.getElementById('addNote50').value || 0) * 50;
    total += parseInt(document.getElementById('addNote20').value || 0) * 20;
    total += parseInt(document.getElementById('addNote10').value || 0) * 10;
    
    // Calculate coins total
    total += parseInt(document.getElementById('addCoin10').value || 0) * 10;
    total += parseInt(document.getElementById('addCoin5').value || 0) * 5;
    total += parseInt(document.getElementById('addCoin2').value || 0) * 2;
    total += parseInt(document.getElementById('addCoin1').value || 0) * 1;
    
    totalAddAmount.textContent = `₹${total}`;
}

// Update total amount received
function updateTotalAmountReceived() {
    let total = 0;
    
    // Calculate notes total
    total += parseInt(document.getElementById('receivedNote500').value || 0) * 500;
    total += parseInt(document.getElementById('receivedNote200').value || 0) * 200;
    total += parseInt(document.getElementById('receivedNote100').value || 0) * 100;
    total += parseInt(document.getElementById('receivedNote50').value || 0) * 50;
    total += parseInt(document.getElementById('receivedNote20').value || 0) * 20;
    total += parseInt(document.getElementById('receivedNote10').value || 0) * 10;
    
    // Calculate coins total
    total += parseInt(document.getElementById('receivedCoin10').value || 0) * 10;
    total += parseInt(document.getElementById('receivedCoin5').value || 0) * 5;
    total += parseInt(document.getElementById('receivedCoin2').value || 0) * 2;
    total += parseInt(document.getElementById('receivedCoin1').value || 0) * 1;
    
    document.getElementById('totalAmountReceived').textContent = `₹${total}`;
}

// Set initial amount
setInitialAmountBtn.addEventListener('click', () => {
    // Get values from inputs
    cashBox.notes[500] = parseInt(document.getElementById('note500').value) || 0;
    cashBox.notes[200] = parseInt(document.getElementById('note200').value) || 0;
    cashBox.notes[100] = parseInt(document.getElementById('note100').value) || 0;
    cashBox.notes[50] = parseInt(document.getElementById('note50').value) || 0;
    cashBox.notes[20] = parseInt(document.getElementById('note20').value) || 0;
    cashBox.notes[10] = parseInt(document.getElementById('note10').value) || 0;
    cashBox.coins[10] = parseInt(document.getElementById('coin10').value) || 0;
    cashBox.coins[5] = parseInt(document.getElementById('coin5').value) || 0;
    cashBox.coins[2] = parseInt(document.getElementById('coin2').value) || 0;
    cashBox.coins[1] = parseInt(document.getElementById('coin1').value) || 0;

    // Show other sections
    initialSetup.style.display = 'none';
    balanceSection.style.display = 'block';
    giveChange.style.display = 'block';
    restartBtn.style.display = 'block';

    // Update display
    updateBalanceDisplay();
    // Save to localStorage
    saveToLocalStorage();
});

// Show Add Amount section
showAddAmountBtn.addEventListener('click', () => {
    addAmount.style.display = 'block';
    // Reset input fields
    addDenominationInputs.forEach(id => {
        document.getElementById(id).value = '';
    });
    updateTotalAddAmount();
});

// Close Add Amount section
closeAddAmountBtn.addEventListener('click', () => {
    addAmount.style.display = 'none';
    // Reset input fields
    addDenominationInputs.forEach(id => {
        document.getElementById(id).value = '';
    });
    updateTotalAddAmount();
});

// Add amount to cash box
addToCashBoxBtn.addEventListener('click', () => {
    // Get values from inputs
    const addNotes = {
        500: parseInt(document.getElementById('addNote500').value) || 0,
        200: parseInt(document.getElementById('addNote200').value) || 0,
        100: parseInt(document.getElementById('addNote100').value) || 0,
        50: parseInt(document.getElementById('addNote50').value) || 0,
        20: parseInt(document.getElementById('addNote20').value) || 0,
        10: parseInt(document.getElementById('addNote10').value) || 0
    };
    
    const addCoins = {
        10: parseInt(document.getElementById('addCoin10').value) || 0,
        5: parseInt(document.getElementById('addCoin5').value) || 0,
        2: parseInt(document.getElementById('addCoin2').value) || 0,
        1: parseInt(document.getElementById('addCoin1').value) || 0
    };

    // Add to cash box
    for (const [denom, count] of Object.entries(addNotes)) {
        cashBox.notes[denom] += count;
    }
    for (const [denom, count] of Object.entries(addCoins)) {
        cashBox.coins[denom] += count;
    }

    // Reset input fields
    addDenominationInputs.forEach(id => {
        document.getElementById(id).value = '0';
    });

    // Update displays
    updateTotalAddAmount();
    updateBalanceDisplay();
    // Save to localStorage
    saveToLocalStorage();
});

// Calculate and give change
calculateChangeBtn.addEventListener('click', () => {
    const productAmount = parseInt(document.getElementById('productAmount').value) || 0;
    let amountReceived = 0;
    
    // Calculate total amount received from denominations
    amountReceived += parseInt(document.getElementById('receivedNote500').value || 0) * 500;
    amountReceived += parseInt(document.getElementById('receivedNote200').value || 0) * 200;
    amountReceived += parseInt(document.getElementById('receivedNote100').value || 0) * 100;
    amountReceived += parseInt(document.getElementById('receivedNote50').value || 0) * 50;
    amountReceived += parseInt(document.getElementById('receivedNote20').value || 0) * 20;
    amountReceived += parseInt(document.getElementById('receivedNote10').value || 0) * 10;
    amountReceived += parseInt(document.getElementById('receivedCoin10').value || 0) * 10;
    amountReceived += parseInt(document.getElementById('receivedCoin5').value || 0) * 5;
    amountReceived += parseInt(document.getElementById('receivedCoin2').value || 0) * 2;
    amountReceived += parseInt(document.getElementById('receivedCoin1').value || 0) * 1;
    
    if (productAmount <= 0) {
        alert('Please enter a valid product amount');
        return;
    }
    
    if (amountReceived <= 0) {
        alert('Please enter received denominations');
        return;
    }
    
    if (amountReceived < productAmount) {
        alert('Amount received is less than product amount');
        return;
    }

    const changeAmount = amountReceived - productAmount;

    // Calculate total balance
    let total = 0;
    for (const [denom, count] of Object.entries(cashBox.notes)) {
        total += parseInt(denom) * count;
    }
    for (const [denom, count] of Object.entries(cashBox.coins)) {
        total += parseInt(denom) * count;
    }

    if (changeAmount > total) {
        alert('Insufficient balance in cash box');
        return;
    }

    // Add received denominations to cash box
    cashBox.notes[500] += parseInt(document.getElementById('receivedNote500').value || 0);
    cashBox.notes[200] += parseInt(document.getElementById('receivedNote200').value || 0);
    cashBox.notes[100] += parseInt(document.getElementById('receivedNote100').value || 0);
    cashBox.notes[50] += parseInt(document.getElementById('receivedNote50').value || 0);
    cashBox.notes[20] += parseInt(document.getElementById('receivedNote20').value || 0);
    cashBox.notes[10] += parseInt(document.getElementById('receivedNote10').value || 0);
    cashBox.coins[10] += parseInt(document.getElementById('receivedCoin10').value || 0);
    cashBox.coins[5] += parseInt(document.getElementById('receivedCoin5').value || 0);
    cashBox.coins[2] += parseInt(document.getElementById('receivedCoin2').value || 0);
    cashBox.coins[1] += parseInt(document.getElementById('receivedCoin1').value || 0);

    // Calculate change denominations
    const change = calculateChange(changeAmount);
    if (!change) {
        alert('Cannot give exact change with available denominations');
        return;
    }

    // Update cash box after giving change
    for (const [denom, count] of Object.entries(change.notes)) {
        cashBox.notes[denom] -= count;
    }
    for (const [denom, count] of Object.entries(change.coins)) {
        cashBox.coins[denom] -= count;
    }

    // Display the change result
    displayChange(change, changeAmount);

    // Update the balance display
    updateBalanceDisplay();
    // Save to localStorage
    saveToLocalStorage();

    // Reset received denomination inputs
    receivedDenominationInputs.forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('productAmount').value = '';
    updateTotalAmountReceived();
});

// Restart cash box
restartBtn.addEventListener('click', () => {
    // Reset cash box
    cashBox = {
        notes: {
            500: 0,
            200: 0,
            100: 0,
            50: 0,
            20: 0,
            10: 0
        },
        coins: {
            10: 0,
            5: 0,
            2: 0,
            1: 0
        }
    };

    // Reset inputs
    document.getElementById('note500').value = '0';
    document.getElementById('note200').value = '0';
    document.getElementById('note100').value = '0';
    document.getElementById('note50').value = '0';
    document.getElementById('note20').value = '0';
    document.getElementById('note10').value = '0';
    document.getElementById('coin10').value = '0';
    document.getElementById('coin5').value = '0';
    document.getElementById('coin2').value = '0';
    document.getElementById('coin1').value = '0';

    // Show initial setup
    initialSetup.style.display = 'block';
    addAmount.style.display = 'none';
    giveChange.style.display = 'none';
    balanceSection.style.display = 'none';
    restartBtn.style.display = 'none';
    changeResult.style.display = 'none';

    // Clear localStorage only on restart
    localStorage.removeItem('cashBoxData');
});

// Calculate change denominations
function calculateChange(amount) {
    const change = {
        notes: {},
        coins: {}
    };
    
    // Available denominations in descending order
    const denominations = [
        { type: 'notes', value: 500 },
        { type: 'notes', value: 200 },
        { type: 'notes', value: 100 },
        { type: 'notes', value: 50 },
        { type: 'notes', value: 20 },
        { type: 'notes', value: 10 },
        { type: 'coins', value: 10 },
        { type: 'coins', value: 5 },
        { type: 'coins', value: 2 },
        { type: 'coins', value: 1 }
    ];

    let remainingAmount = amount;

    for (const denom of denominations) {
        const { type, value } = denom;
        const available = cashBox[type][value];
        const count = Math.min(Math.floor(remainingAmount / value), available);
        
        if (count > 0) {
            change[type][value] = count;
            remainingAmount -= count * value;
        }
    }

    if (remainingAmount > 0) {
        return null; // Cannot give exact change
    }

    return change;
}

// Display change result
function displayChange(change, changeAmount) {
    const changeNotes = document.getElementById('changeNotes');
    const changeCoins = document.getElementById('changeCoins');
    const totalChangeAmount = document.getElementById('totalChangeAmount');
    const balanceAfterChange = document.getElementById('balanceAfterChange');
    const productAmountDisplay = document.getElementById('productAmountDisplay');
    
    // Display product amount
    productAmountDisplay.textContent = document.getElementById('productAmount').value;

    // Display notes
    let notesHtml = '';
    for (const [denom, count] of Object.entries(change.notes)) {
        if (count > 0) {
            notesHtml += `<div>₹${denom}x ${count}</div>`;
        }
    }
    changeNotes.innerHTML = notesHtml || '<div>No notes</div>';

    // Display coins
    let coinsHtml = '';
    for (const [denom, count] of Object.entries(change.coins)) {
        if (count > 0) {
            coinsHtml += `<div>₹${denom}x ${count}</div>`;
        }
    }
    changeCoins.innerHTML = coinsHtml || '<div>No coins</div>';

    // Display total change amount
    totalChangeAmount.textContent = changeAmount;

    // Calculate and display balance after change
    let totalBalance = 0;
    for (const [denom, count] of Object.entries(cashBox.notes)) {
        totalBalance += parseInt(denom) * count;
    }
    for (const [denom, count] of Object.entries(cashBox.coins)) {
        totalBalance += parseInt(denom) * count;
    }
    balanceAfterChange.textContent = totalBalance;

    // Show the change result section
    changeResult.style.display = 'block';
}

// Update balance display
function updateBalanceDisplay() {
    // Calculate total balance
    let total = 0;
    for (const [denom, count] of Object.entries(cashBox.notes)) {
        total += parseInt(denom) * count;
    }
    for (const [denom, count] of Object.entries(cashBox.coins)) {
        total += parseInt(denom) * count;
    }

    // Update total balance display
    totalBalance.textContent = `Total Balance: ₹${total}`;

    // Update denominations display
    let denominationsHtml = '';
    
    // Add notes
    denominationsHtml += '<h4>Notes:</h4>';
    for (const [denom, count] of Object.entries(cashBox.notes)) {
        denominationsHtml += `<div>₹${denom}x ${count}</div>`;
    }
    
    // Add coins
    denominationsHtml += '<h4>Coins:</h4>';
    for (const [denom, count] of Object.entries(cashBox.coins)) {
        denominationsHtml += `<div>₹${denom}x ${count}</div>`;
    }

    currentDenominations.innerHTML = denominationsHtml;
}

// Check login status
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    // Only clear session storage, keep localStorage data
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Add logout button event listener
document.getElementById('logoutBtn').addEventListener('click', logout);

// Check login status and load data when page loads
window.addEventListener('load', () => {
    checkLogin();
    loadFromLocalStorage();
});

// Clear transaction for next transaction
document.getElementById('clearTransaction').addEventListener('click', () => {
    // Reset product amount
    document.getElementById('productAmount').value = '';
    
    // Reset received denomination inputs
    receivedDenominationInputs.forEach(id => {
        document.getElementById(id).value = '';
    });
    
    // Reset total amount received display
    document.getElementById('totalAmountReceived').textContent = '₹0';
    
    // Hide the change result section
    changeResult.style.display = 'none';
    
    // Update total amount received
    updateTotalAmountReceived();
});

// Add click event listeners to calculator buttons
calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if (value) {
            calcExpression += value;
            calcDisplay.value = calcExpression;
        }
    });
});

// Calculate result
calcEquals.addEventListener('click', () => {
    try {
        const result = eval(calcExpression);
        calcExpression = result.toString();
        calcDisplay.value = calcExpression;
    } catch (error) {
        calcDisplay.value = 'Error';
        calcExpression = '';
    }
});

// Clear calculator
calcClear.addEventListener('click', () => {
    calcExpression = '';
    calcDisplay.value = '';
});

// Backspace
calcBackspace.addEventListener('click', () => {
    calcExpression = calcExpression.slice(0, -1);
    calcDisplay.value = calcExpression;
});

// Apply result to product amount
calcApply.addEventListener('click', () => {
    try {
        const result = eval(calcExpression);
        document.getElementById('productAmount').value = result;
        calcExpression = '';
        calcDisplay.value = '';
    } catch (error) {
        calcDisplay.value = 'Error';
        calcExpression = '';
    }
}); 
