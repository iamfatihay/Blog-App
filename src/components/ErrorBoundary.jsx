import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });

        // Log error to console in development
        if (process.env.NODE_ENV === "development") {
            console.error("ErrorBoundary caught an error:", error, errorInfo);
        }
    }

    handleRefresh = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        p: 3,
                        background:
                            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            maxWidth: 500,
                            textAlign: "center",
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <ErrorOutline
                            sx={{
                                fontSize: 80,
                                color: "error.main",
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{ fontWeight: 700, color: "error.main" }}
                        >
                            Oops! Something went wrong
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            We're sorry, but something unexpected happened.
                            Please try refreshing the page.
                        </Typography>

                        {process.env.NODE_ENV === "development" &&
                            this.state.error && (
                                <Box
                                    sx={{
                                        backgroundColor: "grey.100",
                                        p: 2,
                                        borderRadius: 1,
                                        mb: 3,
                                        textAlign: "left",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        component="pre"
                                        sx={{ fontSize: "0.75rem" }}
                                    >
                                        {this.state.error.toString()}
                                        {this.state.errorInfo.componentStack}
                                    </Typography>
                                </Box>
                            )}

                        <Button
                            variant="contained"
                            startIcon={<Refresh />}
                            onClick={this.handleRefresh}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                            }}
                        >
                            Refresh Page
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
