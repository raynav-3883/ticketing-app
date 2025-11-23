export const dummyRoutes = [
  {
    from: "Patna",
    to: "Srinagar",
    routes: [
      {
        type: "Fastest",
        price: 4800,
        duration: "10h 30m",
        departure: "09:00 AM",
        transfers: 1,
        recommended: true,
        segments: [
          {
            mode: "train",
            from: "Patna",
            to: "Delhi",
            duration: "8h 10m",
            operator: "Rajdhani Express",
            price: 1500,
          },
          {
            mode: "flight",
            from: "Delhi",
            to: "Srinagar",
            duration: "2h 10m",
            operator: "IndiGo",
            price: 3300,
          },
        ],
      },
      {
        type: "balanced",
        price: 4600,
        duration: "14h 30m",
        departure: "08:00 AM",
        transfers: 1,
        recommended: false,
        segments: [
          {
            mode: "train",
            from: "Patna",
            to: "Delhi",
            duration: "12h 00m",
            operator: "Duronto Express",
            price: 1200,
          },
          {
            mode: "flight",
            from: "Delhi",
            to: "Srinagar",
            duration: "2h 30m",
            operator: "Air India Express",
            price: 3400,
          },
        ],
      },
    ],
  },
];
