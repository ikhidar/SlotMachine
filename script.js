const spinBtn = document.querySelector("#spinBtn");
const addMoneyBtn = document.querySelector("#addMoneyBtn");
const betInputEl = document.querySelector("#betAmount");

if (spinBtn) spinBtn.addEventListener("click", spinWheel);
if (addMoneyBtn) addMoneyBtn.addEventListener("click", addMoney);

let symbols = ["BAR", "7", "CHERRY", "LEMON"];
let balance = 150;

function randomSymbol() {
  const index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
}
function showImage(filename) {
  const imgDiv = document.querySelector("#imageResult");
  if (!imgDiv) return;
  imgDiv.innerHTML = `<img src="img/${filename}" alt="result image" />`;
}
function spinWheel() {
  const betInput = document.querySelector("#betAmount");
  const bet = parseInt(betInput?.value, 10) || 0;
  const balanceEl = document.querySelector("#balanceAmount");
  const results = document.querySelector("#results");
  if (bet <= 0) {
    if (results) results.textContent = "Enter a positive bet (1 or more).";
    document.body.style.backgroundColor = "#fff4e6"; 
    showImage("money.png"); 
    return;
  }
  if (bet > balance) {
    if (results) results.textContent = "Insufficient funds — please add more!";
    document.body.style.backgroundColor = "#fff4e6";
    showImage("money.png");
    return;
  }

  const slotEls = [
    document.querySelector("#slot1"),
    document.querySelector("#slot2"),
    document.querySelector("#slot3")
  ];
  let frames = 12;
  let frame = 0;
  const spinner = setInterval(() => {
    frame++;
    for (let i = 0; i < slotEls.length; i++) {
      if (slotEls[i]) slotEls[i].textContent = symbols[(frame + i) % symbols.length];
    }
    if (frame >= frames) {
      clearInterval(spinner);
      revealAndResolve(bet);
    }
  }, 45);
}

function revealAndResolve(bet) {
  const slotEls = [
    document.querySelector("#slot1"),
    document.querySelector("#slot2"),
    document.querySelector("#slot3")
  ];
  const results = document.querySelector("#results");
  const balanceEl = document.querySelector("#balanceAmount");

  const final = [];
  for (let i = 0; i < 3; i++) {
    final.push(randomSymbol());
    if (slotEls[i]) slotEls[i].textContent = final[i];
  }
  if (final[0] === final[1] && final[1] === final[2]) {
    payout = bet * 5;
    balance += payout;
    if (results) results.textContent = `Jackpot! Three ${final[0]}s — you win $${payout}!`;
    document.body.style.backgroundColor = "#d4f7d4"; // pale green
    showImage("win.png");
  } else {
    const twoMatch = final[0] === final[1] || final[0] === final[2] || final[1] === final[2];
    if (twoMatch) {
      payout = bet * 2;
      balance += payout;
      if (results) results.textContent = `Nice! Two of a kind — you get $${payout} back.`;
      document.body.style.backgroundColor = "#e8f9e8";
      showImage("win.png");
    } else {
      balance -= bet;
      if (results) results.textContent = `No match — you lose $${bet}. Try again!`;
      document.body.style.backgroundColor = "#ffdede"; // pale red
      showImage("lose.png");
    }
  }
  if (balanceEl) balanceEl.textContent = balance;
}
function addMoney() {
  const depositInput = document.querySelector("#deposit2Balance");
  const deposit = parseInt(depositInput?.value, 10) || 0;
  const balanceEl = document.querySelector("#balanceAmount");
  const results = document.querySelector("#results");

  if (deposit <= 0) {
    if (results) results.textContent = "Enter an amount greater than 0 to deposit.";
    showImage("money.png");
    return;
  }
  for (let i = 0; i < 1; i++) {
    balance += deposit;
  }

  if (balanceEl) balanceEl.textContent = balance;
  if (results) results.textContent = `Deposited $${deposit}. Good luck!`;
  document.body.style.backgroundColor = "#f0fff4";
  showImage("csumb.png"); 
}
if (betInputEl) {
  betInputEl.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const btn = document.querySelector("#spinBtn");
      if (btn) btn.click();
    }
  });
}