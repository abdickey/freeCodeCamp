function checkCashRegister(price, cash, cid) {
  // Dictionary for coin value reference
  const coinRef = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }

  let status;
  // Calculate change needed
  let change = (cash - price).toFixed(2);

  // Calculate the total amount of cash in the drawer
  let cidTotal = 0;
  for (let i = 0; i < cid.length; i++) {
    cidTotal += cid[i][1];
  }
  cidTotal = parseFloat(cidTotal.toFixed(2));

  // Determine status based on cash in drawer and change needed
  if (cidTotal < change) {
    status = "INSUFFICIENT_FUNDS";
    change = [];
  } else if (cidTotal === parseFloat(change)) {
    status = "CLOSED";
  } else {
    // Calculate change using available coins
    let changeArray = [];
    for (let i = cid.length - 1; i >= 0; i--) {
      let currentCoinValue = coinRef[cid[i][0]];
      let currentCoinAmount = 0;

      // Dispense coins while there's enough in the drawer and change is greater or equal to the coin value
      while (change >= currentCoinValue && cid[i][1] > 0) {
        change -= currentCoinValue;
        change = parseFloat(change.toFixed(2));
        cid[i][1] -= currentCoinValue;
        currentCoinAmount += currentCoinValue;
      }

      // Add the dispensed coins to the change array
      if (currentCoinAmount > 0) {
        changeArray.push([cid[i][0], currentCoinAmount]);
      }
    }

    // Determine status based on remaining change
    if (change > 0) {
      status = "INSUFFICIENT_FUNDS";
      change = [];
    } else {
      status = "OPEN";
      change = changeArray;
    }
  }

  // Return the result
  return {status: status, change: change};
}
