import React from 'react';
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Helmet } from "react-helmet";



const Profile = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const image = useSelector(state => state.auth.image);
  const firstName = useSelector(state => state.auth.first_name);
  const email = useSelector(state => state.auth.email);
  const bio = useSelector(state => state.auth.bio);

  return (
    <Grid container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3, height: "74.5vh" }}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Card sx={{
        width: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>

        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          image={image}
          alt="image"
        />
        <CardContent sx={{ textAlign: "center" }} >
          <Typography variant="h2" color="text.primary">
            {currentUser}
          </Typography>
          <Typography variant="h4" color="text.primary">
            {firstName}
          </Typography>
          <Typography variant="h4" color="text.primary">
            {email}
          </Typography>
          <Typography variant="p" color="text.primary">
            {bio}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Profile