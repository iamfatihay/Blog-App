import React from "react";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#0ea5e9",
                light: "#38bdf8",
                dark: "#0284c7",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#64748b",
                light: "#94a3b8",
                dark: "#475569",
                contrastText: "#ffffff",
            },
            background: {
                default: "#f8fafc",
                paper: "#ffffff",
            },
            text: {
                primary: "#1f2937",
                secondary: "#6b7280",
            },
        },
        typography: {
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            h1: {
                fontWeight: 700,
                fontSize: "2.5rem",
            },
            h2: {
                fontWeight: 600,
                fontSize: "2rem",
            },
            h3: {
                fontWeight: 600,
                fontSize: "1.5rem",
            },
            button: {
                textTransform: "none",
                fontWeight: 500,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: "none",
                        fontWeight: 500,
                        padding: "10px 20px",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        transition: "box-shadow 0.3s ease-in-out",
                        "&:hover": {
                            boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        },
                    },
                },
            },
        },
    });

    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                            <AppRouter />
                        </div>
                    </PersistGate>
                </Provider>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    style={{ marginTop: "70px" }}
                />
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
