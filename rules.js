const RULES = [
  {
    condition: (d) => d.section === "194I" && d.period === "monthly" && d.amount < 50000,
    result: "No TDS (Rent below ₹50,000/month)"
  },
  {
    condition: (d) => d.yearly < d.limit,
    result: (d) => `No TDS (Below ₹${d.limit})`
  }
];
