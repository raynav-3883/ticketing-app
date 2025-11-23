export const routes = [
  // ---------- PATNA TO DELHI ----------
  {
    source: "Patna",
    destination: "Delhi",
    cost: 700,
    time: 10,
    mode: "train"
  },
  {
    source: "Patna",
    destination: "Delhi",
    cost: 3500,
    time: 2,
    mode: "flight"
  },

  // ---------- DELHI TO SRINAGAR ----------
  {
    source: "Delhi",
    destination: "Srinagar",
    cost: 5500,
    time: 1.5,
    mode: "flight"
  },
  {
    source: "Delhi",
    destination: "Srinagar",
    cost: 1400,
    time: 18,
    mode: "bus"
  },

  // ---------- EXTRA CONNECTIVITY ----------
  {
    source: "Patna",
    destination: "Lucknow",
    cost: 500,
    time: 9,
    mode: "train"
  },
  {
    source: "Lucknow",
    destination: "Delhi",
    cost: 400,
    time: 6,
    mode: "train"
  }
];
