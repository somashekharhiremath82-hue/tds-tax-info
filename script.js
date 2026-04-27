window.onload = function () {
  let s = document.getElementById("section");

  s.innerHTML = ""; // reset

  for (let k in TDS_DATA) {
    let o = document.createElement("option");
    o.value = k; // keep OLD key
    o.text = TDS_DATA[k].name; // show NEW name
    s.appendChild(o);
  }

  updateOptions();
};

// OPTIONS
function updateOptions() {
  let section = document.getElementById("section").value;
  let box = document.getElementById("extraOptions");
  box.innerHTML = "";

  if (section === "194C") {
    box.innerHTML = `
      <select id="deductee">
        <option value="non">Non-Company</option>
        <option value="company">Company</option>
      </select>`;
  }

  if (section === "194J") {
    box.innerHTML = `
      <select id="type">
        <option value="professional">Professional</option>
        <option value="technical">Technical</option>
      </select>`;
  }

  if (section === "194I") {
    box.innerHTML = `
      <select id="rentType">
        <option value="building">Building</option>
        <option value="plant">Plant</option>
      </select>`;
  }
}

// CALCULATOR
function calculateTDS() {
  let amount = parseFloat(document.getElementById("amount").value);
  let section = document.getElementById("section").value;
  let period = document.getElementById("period").value;
  let pan = document.getElementById("pan").value;

  if (!amount || amount <= 0) return show("Enter valid amount");

  if (!TDS_DATA[section]) return show("Invalid section");

  let info = TDS_DATA[section];
  let yearly = period === "monthly" ? amount * 12 : amount;

  let rate = 0;

  if (info.rate) rate = info.rate;
  else if (info.rates) rate = Object.values(info.rates)[0];

  if (section === "194C") {
    rate = info.rates[document.getElementById("deductee").value];
    if (amount < 30000) return show("No TDS\nBelow ₹30,000");
  }

  if (section === "194J") {
    rate = info.rates[document.getElementById("type").value];
    if (yearly < 30000) return show("No TDS\nBelow ₹30,000");
  }

  if (section === "194H") {
    if (yearly < 15000) return show("No TDS\nBelow ₹15,000");
  }

  if (section === "194I") {
    rate = info.rates[document.getElementById("rentType").value];

    if (period === "monthly" && amount < 50000)
      return show("No TDS\nMonthly rent below ₹50,000");

    if (yearly < 240000)
      return show("No TDS\nBelow ₹2,40,000");
  }

  if (pan === "no") rate = 0.20;

  let tds = amount * rate;
  let net = amount - tds;

  show(`
Section       : ${info.name}

Basic Amount  : ₹${amount}
Rate          : ${rate * 100}%

TDS           : ₹${tds}
Net Amount    : ₹${net}
`);
}

// SHOW
function show(text) {
  document.getElementById("result").innerText = text;
}

// HSN SEARCH
function findHSN() {
  let input = document.getElementById("hsn").value.toLowerCase();

  let match = HSN_DATA.find(x =>
    input.startsWith(x.code) ||
    x.keywords.some(k => input.includes(k))
  );

  if (!match) {
    document.getElementById("hsnResult").innerText = "No match found";
    return;
  }

  let info = TDS_DATA[match.tds];

  if (!info) {
    document.getElementById("hsnResult").innerText = "Mapping error";
    return;
  }

  document.getElementById("section").value = match.tds;
  updateOptions();

  document.getElementById("hsnResult").innerText =
    `HSN: ${match.desc} → ${info.name}`;
}
