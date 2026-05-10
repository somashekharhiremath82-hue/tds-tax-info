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

  let invoiceAmount =
    parseFloat(document.getElementById("invoiceAmount").value);

  let gstPercent =
    parseFloat(document.getElementById("gstPercent").value) || 0;

  let section =
    document.getElementById("section").value;

  let period =
    document.getElementById("period").value;

  let pan =
    document.getElementById("pan").value;

  if (!invoiceAmount || invoiceAmount <= 0)
    return show("Enter valid invoice amount");

  if (!TDS_DATA[section])
    return show("Invalid section");

  let info = TDS_DATA[section];

  // ✅ GST INCLUDED IN INVOICE
  let taxableAmount =
    invoiceAmount / (1 + gstPercent / 100);

  let gstAmount =
    invoiceAmount - taxableAmount;

  let yearly =
    period === "monthly"
      ? taxableAmount * 12
      : taxableAmount;

  let rate = 0;

  // DEFAULT RATE
  if (info.rate)
    rate = info.rate;

  else if (info.rates)
    rate = Object.values(info.rates)[0];

  // CONTRACTOR
  if (section === "194C") {

    rate =
      info.rates[
        document.getElementById("deductee").value
      ];

    if (taxableAmount < 30000)
      return show("No TDS\nBelow ₹30,000");
  }

  // PROFESSIONAL
  if (section === "194J") {

    rate =
      info.rates[
        document.getElementById("type").value
      ];

    if (yearly < 50000)
      return show("No TDS\nBelow ₹50,000");
  }

  // COMMISSION
  if (section === "194H") {

    if (yearly < 20000)
      return show("No TDS\nBelow ₹20,000");
  }

  // RENT
  if (section === "194I") {

    rate =
      info.rates[
        document.getElementById("rentType").value
      ];

    if (
      period === "monthly" &&
      taxableAmount < 50000
    )
      return show("No TDS\nMonthly rent below ₹50,000");
  }

  // NO PAN
  if (pan === "no")
    rate = 0.20;

  let tds =
    taxableAmount * rate;

  let net =
    invoiceAmount - tds;

  show(`
Section           : ${info.name}

Invoice Amount    : ₹${invoiceAmount}

GST %             : ${gstPercent}%
GST Amount        : ₹${gstAmount.toFixed(2)}

Taxable Amount    : ₹${taxableAmount.toFixed(2)}

Rate              : ${(rate * 100).toFixed(2)}%

TDS               : ₹${tds.toFixed(2)}

Net Payable       : ₹${net.toFixed(2)}
`);
}

// SHOW
function show(text) {
  document.getElementById("result").innerText = text;
}

// HSN SEARCH
function findHSN() {

  let input =
    document.getElementById("hsn").value.trim();

  // ✅ ONLY 4+ DIGITS
  if (input.length < 4) {

    document.getElementById("hsnResult").innerText =
      "Enter minimum 4 digit HSN/SAC code";

    return;
  }

  let match = HSN_DATA.find(x =>
    x.code.startsWith(input)
  );

  if (!match) {

    document.getElementById("hsnResult").innerText =
      "No HSN/SAC match found";

    return;
  }

  let info = TDS_DATA[match.tds];

  if (!info) {

    document.getElementById("hsnResult").innerText =
      "Section mapping missing";

    return;
  }

  // AUTO SELECT SECTION
  if (document.getElementById("section")) {
    document.getElementById("section").value = match.tds;

    if (typeof updateOptions === "function")
      updateOptions();
  }

  document.getElementById("hsnResult").innerText =

`HSN/SAC : ${match.code}

Nature  : ${match.desc}

Type    : ${match.type}

Section : ${info.name}`;
}
