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

    // Display change
    displayChange(change, changeAmount);
    
    // Reset input fields
    document.getElementById('productAmount').value = '';
    receivedDenominationInputs.forEach(id => {
        document.getElementById(id).value = '';
    });
    
    updateBalanceDisplay();
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
});

// Calculate change in denominations
function calculateChange(amount) {
    const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];
    let remaining = amount;
    const change = {
        notes: { 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 },
        coins: { 10: 0, 5: 0, 2: 0, 1: 0 }
    };

    for (const denom of denominations) {
        if (remaining >= denom) {
            const available = denom >= 10 ? cashBox.notes[denom] : cashBox.coins[denom];
            const needed = Math.floor(remaining / denom);
            const count = Math.min(available, needed);
            
            if (denom >= 10) {
                change.notes[denom] = count;
            } else {
                change.coins[denom] = count;
            }
            
            remaining -= count * denom;
        }
    }

    return remaining === 0 ? change : null;
}

// Display change denominations
function displayChange(change, changeAmount) {
    let changeHtml = '';
    
    // Add notes
    changeHtml += '<h4>Notes:</h4>';
    for (const [denom, count] of Object.entries(change.notes)) {
        if (count > 0) {
            changeHtml += `<div>₹${denom}: ${count}</div>`;
        }
    }
    
    // Add coins
    changeHtml += '<h4>Coins:</h4>';
    for (const [denom, count] of Object.entries(change.coins)) {
        if (count > 0) {
            changeHtml += `<div>₹${denom}: ${count}</div>`;
        }
    }

    // Add change amount and balance after change
    let totalBalance = 0;
    for (const [denom, count] of Object.entries(cashBox.notes)) {
        totalBalance += parseInt(denom) * count;
    }
    for (const [denom, count] of Object.entries(cashBox.coins)) {
        totalBalance += parseInt(denom) * count;
    }

    changeHtml += `<div class="total-amount">
        <h4>Change Amount: ₹${changeAmount}</h4>
        <h4>Balance After Change: ₹${totalBalance}</h4>
    </div>`;

    changeDenominations.innerHTML = changeHtml;
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
        denominationsHtml += `<div>₹${denom}: ${count}</div>`;
    }
    
    // Add coins
    denominationsHtml += '<h4>Coins:</h4>';
    for (const [denom, count] of Object.entries(cashBox.coins)) {
        denominationsHtml += `<div>₹${denom}: ${count}</div>`;
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
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Add logout button event listener
document.getElementById('logoutBtn').addEventListener('click', logout);

// Check login status when page loads
checkLogin(); 