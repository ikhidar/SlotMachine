document.querySelector("#spinBtn").addEventListener("click", spinWheel);
document.querySelector("#addMoneyBtn").addEventListener("click", addMoney);

let symbols = ["BAR", "7", "CHERRY", "LEMON"];
let balance = 150;

function randomSymbol() {
  let index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
}

function showImage(filename) {
  const imgDiv = document.querySelector("#imageResult");
  imgDiv.innerHTML = `<img src="${filename}" alt="result image">`;
}

function spinWheel() {
  const bet = parseInt(document.querySelector("#betAmount").value) || 0;
  const results = document.querySelector("#results");
  const balanceEl = document.querySelector("#balanceAmount");

  if (bet <= 0) {
    results.textContent = "Enter a positive bet.";
    document.body.style.backgroundColor = "#fff4e6";
    showImage("money.png");
    return;
  }

  if (bet > balance) {
    results.textContent = "Not enough balance. Add funds.";
    document.body.style.backgroundColor = "#fff4e6";
    showImage("money.png");
    return;
  }

  const slots = [
    document.querySelector("#slot1"),
    document.querySelector("#slot2"),
    document.querySelector("#slot3")
  ];

  let final = [];

  for (let i = 0; i < 3; i++) {
    let symbol = randomSymbol();
    final.push(symbol);
    slots[i].textContent = symbol;
  }

  if (final[0] === final[1] && final[1] === final[2]) {
    let payout = bet * 5;
    balance += payout;
    results.textContent = `Jackpot! You win $${payout}!`;
    document.body.style.backgroundColor = "#d4f7d4";
    showImage("win.png");
  } else if (
    final[0] === final[1] ||
    final[0] === final[2] ||
    final[1] === final[2]
  ) {
    let payout = bet * 2;
    balance += payout;
    results.textContent = `Two match! You win $${payout}!`;
    document.body.style.backgroundColor = "#e8f9e8";
    showImage("win.png");
  } else {
    balance -= bet;
    results.textContent = `You lost $${bet}. Try again.`;
    document.body.style.backgroundColor = "#ffdede";
    showImage("lose.png");
  }

  balanceEl.textContent = balance;
}

function addMoney() {
  const deposit = parseInt(document.querySelector("#deposit2Balance").value) || 0;
  const balanceEl = document.querySelector("#balanceAmount");
  const results = document.querySelector("#results");

  if (deposit <= 0) {
    results.textContent = "Enter a valid deposit amount.";
    showImage("money.png");
    return;
  }

  balance += deposit;
  balanceEl.textContent = balance;
  results.textContent = `Deposited $${deposit}. Good luck!`;
  document.body.style.backgroundColor = "#f0fff4";
  showImage("csumb.png");
}

document.querySelector("#betAmount").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector("#spinBtn").click();
  }
});