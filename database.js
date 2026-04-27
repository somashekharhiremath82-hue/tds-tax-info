const TDS_DATA = {

  "194C": {
    name: "397 - Contractor",
    rates: { non: 0.01, company: 0.02 }
  },

  "194J": {
    name: "398 - Professional / Technical",
    rates: { professional: 0.10, technical: 0.02 }
  },

  "194H": {
    name: "397(2) - Commission",
    rate: 0.05
  },

  "194I": {
    name: "399 - Rent",
    rates: { building: 0.10, plant: 0.02 }
  },

  "194D": {
    name: "396(2) - Insurance Commission",
    rate: 0.05
  },

  "194Q": {
    name: "401 - Purchase of Goods",
    rate: 0.001
  }

};

const HSN_DATA = [
  { code: "9982", desc: "Professional Fees", tds: "194J", keywords: ["ca","legal"] },
  { code: "9983", desc: "Technical Services", tds: "194J", keywords: ["consultant"] },
  { code: "9954", desc: "Contractor", tds: "194C", keywords: ["construction"] },
  { code: "9987", desc: "Contract Services", tds: "194C", keywords: ["contract"] },
  { code: "9972", desc: "Rent (Building)", tds: "194I", keywords: ["rent"] },
  { code: "9973", desc: "Rent (Plant)", tds: "194I", keywords: ["machine"] },
  { code: "9961", desc: "Commission", tds: "194H", keywords: ["broker"] },
  { code: "9971", desc: "Insurance Commission", tds: "194D", keywords: ["insurance"] },
  { code: "any", desc: "Purchase of Goods", tds: "194Q", keywords: ["goods"] }
];
