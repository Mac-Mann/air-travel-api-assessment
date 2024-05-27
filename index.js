import express from 'express';
// import data from './data.json' assert { type: 'json' };

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle flight path requests
app.post('/calculate', (req, res) => {
  const flights = req.body.flights.length ? req.body.flights : '';
  const flattenedArr = flights.flat();

  // Check if all nested arrays have exactly 2 elements
  const isValid = flights.every(flight => Array.isArray(flight) && flight.length === 2 && flight.join(',').length === 7);

  if (!isValid) {
    return res.status(400).json({ error: 'Each flight entry must be an array with exactly 2 IATA codes ordered from starting location to ending location: [CHA, ATL]. Exactly as you would see on a plane ticket. If multiple entries, then tickets must be related to flight plan.' });
  }

  // Create an object to store counts and other useful values for sorting
  const obj = {};

  // Count instances of each data point. If count > 1 then it is a layover flight
  flattenedArr.forEach((item, index) => {
    obj[item] = { count: (obj[item] || 0) +  1, arrInstance: index + 1};
  });

  let src = '';
  let dest = '';

  for (const key in obj) {
    const count = obj[key].count;
    if (count === 1) {
        // If only 1 flight, it must be either the first (source) flight or the destination. 
        // If it was the first in its array, then it is the source flight.
        // If it was the second in its array, then it is the destination.
        // if we ever allow nested array instances to have more than 2 values in our API reqursts, then we would need to revisit this.
        obj[key].arrInstance % 2 === 0 ? dest = key : src = key;
    }
  }

  /* For a better flight path, just a demonstration to show it's possible to return and display a more through answer to the user

  const fullFlightPath = [];
  const flightsArrClone = [...flights];

  while (flightsArrClone.length) {
    flightsArrClone.forEach((flight, index) => {
        if (flight[0] === src) {
            fullFlightPath.push(...flight);
            flightsArrClone.splice(index, 1);
        } else if (flightsArrClone.length > 1) {
            if (flight[0] === fullFlightPath[fullFlightPath.length - 1] && flight[1] !== dest) {
                fullFlightPath.push(flight[1]);
                flightsArrClone.splice(index, 1);
            }
        } else if (flightsArrClone.length === 1) {
            fullFlightPath.push(flight[1]);
            flightsArrClone.splice(index, 1);
        }
    })
  }

  */
  
  // Return the flight path
  // res.json(fullFlightPath);
  res.json([src, dest]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
