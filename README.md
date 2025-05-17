# Cash Box Application

A modern web-based cash box management system for handling cash transactions, calculating change, and maintaining cash balance.

## Features

### 1. Cash Box Management
- Initial cash box setup with denominations
- Real-time balance tracking
- Add cash functionality
- Persistent data storage (survives browser refresh)
- Restart cash box option

### 2. Change Calculation
- Product amount input
- Received amount calculation
- Automatic change calculation
- Denomination-wise change breakdown
- Transaction summary

### 3. Calculator Integration
- Basic arithmetic operations
- Quick amount calculations
- Apply calculated amount to product price
- Clear and backspace functionality

### 4. User Interface
- Modern and responsive design
- Color-coded sections
- Clear transaction summaries
- Easy-to-use denomination inputs
- Real-time total calculations

### 5. Security
- Login/Logout functionality
- Session management
- Data persistence
- Secure data handling

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Open the project folder:
```bash
cd cashbox-main
```

3. Open `index.html` in a web browser

## Usage Guide

### Initial Setup
1. Enter initial denominations for notes and coins
2. Click "Set Initial Amount" to start

### Adding Cash
1. Click "Add Cash" button
2. Enter denominations to add
3. Click "Add Amount" to update balance

### Making Transactions
1. Enter product amount
2. Use calculator if needed
3. Enter received denominations
4. Click "Calculate Change"
5. View transaction summary
6. Use "Clear for Next Transaction" to reset

### Calculator Usage
1. Use number pad for input
2. Perform calculations
3. Click "Apply to Amount" to set product price

### Managing Cash Box
- View current balance at bottom of page
- Check denominations anytime
- Add cash when needed
- Restart cash box if required

## Data Persistence
- Data is automatically saved to browser's localStorage
- Data persists between sessions
- Data is only cleared when:
  - Clicking "Restart Cash Box" button
  - Manually clearing browser data

## Technical Details

### Files Structure
- `index.html` - Main application interface
- `script.js` - Application logic and functionality
- `styles.css` - Styling and layout
- `login.html` - Login page

### Dependencies
- No external dependencies required
- Pure HTML, CSS, and JavaScript

### Browser Support
- Works on all modern browsers
- Requires JavaScript enabled
- Requires localStorage support

## Security Notes
- Login required to access application
- Session-based authentication
- Data stored locally in browser
- No server-side storage

## Best Practices
1. Regular balance checks
2. Clear transactions after completion
3. Restart cash box at end of day
4. Keep login credentials secure

## Support
For issues or questions:
1. Check existing documentation
2. Review code comments
3. Contact support team

## License
[Your License Information]

## Version
1.0.0
