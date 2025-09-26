import React from "react";
import { Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled("footer")(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: theme.spacing(3),
    borderTop: "1px solid rgba(99, 102, 241, 0.1)",
    boxShadow: "0px -4px 20px rgba(99, 102, 241, 0.1)",
}));

const Footer = () => {
    return (
        <div>
            <div style={{ minHeight: "3vh", paddingBottom: "90px" }}> </div>
            <FooterContainer>
                <Container maxWidth="sm">
                    <Typography
                        variant="body1"
                        align="center"
                        color="textSecondary"
                    >
                        Developed by Fatih Ay
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="textSecondary"
                    >
                        © 2023 Blog App. All rights reserved.
                    </Typography>
                </Container>
            </FooterContainer>
        </div>
    );
};

export default Footer;
