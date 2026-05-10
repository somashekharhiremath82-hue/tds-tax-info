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

  {
    code: "99711",
    desc: "Interest on Securities",
    type: "Service",
    tds: "193",
    keywords: ["interest securities", "bond interest"]
  },

  {
    code: "99711",
    desc: "Dividend to Individual Shareholder",
    type: "Service",
    tds: "194",
    keywords: ["dividend"]
  },

  {
    code: "99711",
    desc: "Interest other than Securities",
    type: "Service",
    tds: "194A",
    keywords: ["bank interest", "interest"]
  },

  {
    code: "9954",
    desc: "Payment to Contractors / Sub-Contractors",
    type: "Service",
    tds: "194C",
    keywords: ["contract", "construction", "maintenance"]
  },

  {
    code: "9961",
    desc: "Commission or Brokerage",
    type: "Service",
    tds: "194H",
    keywords: ["commission", "brokerage", "broker"]
  },

  {
    code: "99731",
    desc: "Rent - Plant and Machinery",
    type: "Service",
    tds: "194I",
    keywords: ["machine rent", "plant rent"]
  },

  {
    code: "99721",
    desc: "Rent - Land and Building",
    type: "Service",
    tds: "194I",
    keywords: ["building rent", "office rent", "property rent"]
  },

  {
    code: "9983",
    desc: "Technical / Professional Services",
    type: "Service",
    tds: "194J",
    keywords: ["consultant", "professional", "technical"]
  },

  {
    code: "99839",
    desc: "Business / Profession Perquisite or Benefit",
    type: "Service",
    tds: "194R",
    keywords: ["benefit", "perquisite"]
  },

  {
    code: "7204",
    desc: "Sale of Scrap (Metal)",
    type: "Goods",
    tds: "206C(1)",
    keywords: ["metal scrap"]
  },

  {
    code: "3915",
    desc: "Sale of Scrap (Plastic)",
    type: "Goods",
    tds: "206C(1)",
    keywords: ["plastic scrap"]
  },

  {
    code: "7404",
    desc: "Sale of Scrap (Copper)",
    type: "Goods",
    tds: "206C(1)",
    keywords: ["copper scrap"]
  },

  {
    code: "general",
    desc: "Purchase of Goods",
    type: "Goods",
    tds: "194Q",
    keywords: ["goods purchase", "purchase"]
  }

];
