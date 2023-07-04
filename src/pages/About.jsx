import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import logo from "../assets/logo1.png";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Helmet} from "react-helmet";

const handleLinkedInClick = () => {
  window.open('https://www.linkedin.com/in/fatih-ay1661/', '_blank');
};

const handleGitHubClick = () => {
  window.open('https://github.com/iamfatihay', '_blank');
};


const About = () => {
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3,mb:3 }}>
    <Helmet>
      <title>About Developer</title>
    </Helmet>
      <Card sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "71.5vh",
      }}>

        <CardMedia
          sx={{ height: 500, objectFit: "contain" }}
          component="img"
          image={logo}
          alt="image"
        />
        <CardContent sx={{ height: 130, textAlign: "center" }} >
          <Typography variant="h4" color="text.primary">
            Full Stack Developer
          </Typography>
        </CardContent>

        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Grid >
            <IconButton aria-label="linkedIn" onClick={handleLinkedInClick}>
              <LinkedInIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton aria-label="GitHub" onClick={handleGitHubClick}>
              <GitHubIcon color='secondary' fontSize='large' />
            </IconButton>

          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default About