// Function to switch sections
function showSection(sectionId) {
    let sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";

    // If the user selects Transaction History, load it
    if (sectionId === "history") {
        loadTransactionHistory();
    }
}

// Function to show login
function showLogin() {
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
}

// Register function
function register() {
    let username = document.getElementById("new-username").value;
    let password = document.getElementById("new-password").value;

    if (!username || !password) {
        alert("Username and password cannot be empty.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    showLogin();
}

// Login function
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        document.getElementById("login").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        document.getElementById("user-name").textContent = username;
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password.";
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// Show Payment Form
function showPaymentForm() {
    document.getElementById("payment-form").style.display = "block";
}

// Make a Payment and Store in History
function makePayment() {
    let amount = document.getElementById("amount").value;
    let method = document.getElementById("method").value;
    let username = localStorage.getItem("loggedInUser");

    if (!amount) {
        alert("Please enter an amount.");
        return;
    }

    let transaction = {
        type: "Payment",
        amount: amount,
        method: method,
        date: new Date().toLocaleString()
    };

    saveTransaction(username, transaction);
    document.getElementById("payment-success").textContent = "Payment Successful!";
}

// Show Transfer Form
function showTransferForm() {
    document.getElementById("transfer-form").style.display = "block";
}

// Make a Fund Transfer and Store in History
function makeTransfer() {
    let recipient = document.getElementById("recipient").value;
    let amount = document.getElementById("transfer-amount").value;
    let username = localStorage.getItem("loggedInUser");

    if (!recipient || !amount) {
        alert("Please enter recipient and amount.");
        return;
    }

    let transaction = {
        type: "Fund Transfer",
        recipient: recipient,
        amount: amount,
        date: new Date().toLocaleString()
    };

    saveTransaction(username, transaction);
    document.getElementById("transfer-success").textContent = "Transfer Successful!";
}

// Function to Save Transactions in Local Storage
function saveTransaction(username, transaction) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || {};
    if (!transactions[username]) {
        transactions[username] = [];
    }
    transactions[username].push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to Load Transaction History
function loadTransactionHistory() {
    let username = localStorage.getItem("loggedInUser");
    let transactions = JSON.parse(localStorage.getItem("transactions")) || {};
    let historyList = document.getElementById("transaction-history");
    historyList.innerHTML = "";

    if (transactions[username] && transactions[username].length > 0) {
        transactions[username].forEach((tx) => {
            let li = document.createElement("li");
            if (tx.type === "Payment") {
                li.textContent = `🟢 Paid ₹${tx.amount} via ${tx.method} on ${tx.date}`;
            } else if (tx.type === "Fund Transfer") {
                li.textContent = `🔵 Transferred ₹${tx.amount} to ${tx.recipient} on ${tx.date}`;
            }
            historyList.appendChild(li);
        });
    } else {
        historyList.innerHTML = "<p>No transactions found.</p>";
    }
}

// Function to toggle password visibility
function togglePassword() {
    let passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
