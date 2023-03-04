import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

export default function UserHomePage() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "45vh",
              width: "60vh"
            }}
          >
            <Typography variant="h4">Profile</Typography>
            <AccountCircle sx={{ height: "20vh", width: "20vh" }} />
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              USERNAME <EditIcon sx={{ marginLeft: "5px" }} />
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Name
            </Typography>
            <Typography> ID </Typography>
            <Typography> Reputation </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "90vh",
            }}>
            <Typography variant="h4">Current Rides</Typography>
            {/* Add browse category section content here */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
