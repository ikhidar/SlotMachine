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
  const betInput = document.querySelector("#betAmount");
  const bet = parseInt(betInput.value, 10) || 0;
  const results = document.querySelector("#results");

  if (bet <= 0) {
    results.textContent = "Enter a positive bet (1 or more).";
    document.body.style.backgroundColor = "#fff4e6";
    showImage("money.png");
    return;
  }

  if (bet > balance) {
    results.textContent = "Insufficient funds — please add more!";
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
      slotEls[i].textContent = symbols[(frame + i) % symbols.length];
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
    slotEls[i].textContent = final[i];
  }

  if (final[0] === final[1] && final[1] === final[2]) {
    let payout = bet * 5;
    balance += payout;
    results.textContent = `Jackpot! Three ${final[0]}s — you win $${payout}!`;
    document.body.style.backgroundColor = "#d4f7d4";
    showImage("win.png");
  } else {
    let twoMatch = final[0] === final[1] || final[0] === final[2] || final[1] === final[2];

    if (twoMatch) {
      let payout = bet * 2;
      balance += payout;
      results.textContent = `Nice! Two of a kind — you get $${payout} back.`;
      document.body.style.backgroundColor = "#e8f9e8";
      showImage("win.png");
    } else {
      balance -= bet;
      results.textContent = `No match — you lose $${bet}. Try again!`;
      document.body.style.backgroundColor = "#ffdede";
      showImage("lose.png");
    }
  }

  balanceEl.textContent = balance;
}

function addMoney() {
  const depositInput = document.querySelector("#deposit2Balance");
  const deposit = parseInt(depositInput.value, 10) || 0;
  const balanceEl = document.querySelector("#balanceAmount");
  const results = document.querySelector("#results");

  if (deposit <= 0) {
    results.textContent = "Enter an amount greater than 0 to deposit.";
    showImage("money.png");
    return;
  }

  for (let i = 0; i < 1; i++) {
    balance += deposit;
  }

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