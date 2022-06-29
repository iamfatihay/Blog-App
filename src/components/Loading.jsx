import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = ({ message = "Loading..." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                gap: 2,
            }}
        >
            <CircularProgress
                size={60}
                sx={{
                    color: "primary.main",
                    "& .MuiCircularProgress-circle": {
                        strokeLinecap: "round",
                    },
                }}
            />
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
