import React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';

export default function RidePage() {
  // state for filters
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [date, setDate] = React.useState('');

  // sample data for available rides
  const rides = [
    { id: 1, origin: 'New York', destination: 'Boston', date: '2022-01-01', time: '10:00am', seatsAvailable: 2 },
    { id: 2, origin: 'Boston', destination: 'New York', date: '2022-01-02', time: '11:00am', seatsAvailable: 3 },
    { id: 3, origin: 'San Francisco', destination: 'Los Angeles', date: '2022-01-03', time: '12:00pm', seatsAvailable: 1 },
    { id: 4, origin: 'Los Angeles', destination: 'San Francisco', date: '2022-01-04', time: '1:00pm', seatsAvailable: 0 },
  ];

  // filter function for available rides
  const filteredRides = rides.filter(
    (ride) =>
      ride.origin.toLowerCase().includes(origin.toLowerCase()) &&
      ride.destination.toLowerCase().includes(destination.toLowerCase()) &&
      ride.date.includes(date)
  );

  return (
    <Grid container spacing={2}>
      {/* filters on the left */}
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2}}>
          <Typography variant="h6">Filters</Typography>
          <TextField label="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} fullWidth margin="normal" />
          <TextField label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} fullWidth margin="normal" />
          <TextField type="date"  value={date} onChange={(e) => setDate(e.target.value)} fullWidth margin="normal" />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Apply Filters
          </Button>
        </Paper>
      </Grid>
      {/* available rides on the right */}
      <Grid item xs={12} sm={8}>
        <Paper sx={{ p: 2, height: '86.5vh' }}>
          <Typography variant="h6">Available Rides</Typography>
          {filteredRides.length === 0 ? (
            <Typography variant="subtitle1">No rides found.</Typography>
          ) : (
            filteredRides.map((ride) => (
              <Paper key={ride.id} sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1">
                  {ride.origin} to {ride.destination}
                </Typography>
                <Typography variant="body2">
                  Date: {ride.date}, Time: {ride.time}, Seats Available: {ride.seatsAvailable}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                  Book Ride
                </Button>
              </Paper>
            ))
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
