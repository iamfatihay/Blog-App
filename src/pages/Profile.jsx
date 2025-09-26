import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import avatar from "../assets/avatar.png";

const Profile = () => {
    const { currentUser, image, firstName, email, bio } = useSelector(
        (state) => state.auth
    );

    return (
        <Grid
            container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 160px)", // Subtract header height + extra padding
            }}
        >
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Card
                sx={{
                    width: "700px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <CardMedia
                    sx={{ objectFit: "contain", height: "300px" }}
                    component="img"
                    image={image ? image : avatar}
                    alt="image"
                />
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h3" color="text.primary">
                        {currentUser}
                    </Typography>
                    <Typography variant="h5" color="text.primary">
                        {firstName}
                    </Typography>
                    <Typography variant="h5" color="text.primary">
                        {email}
                    </Typography>
                    <Typography variant="p" color="text.primary">
                        {bio}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Profile;
