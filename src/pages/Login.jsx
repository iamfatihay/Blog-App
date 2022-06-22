import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/login_img.svg";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCalls";
import LoginForm, { loginScheme } from "../components/auth/LoginForm";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";

const Login = () => {
    const { login } = useAuthCall();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                py: 4,
            }}
        >
            <Helmet>
                <title>Login - Blog App</title>
                <meta
                    name="description"
                    content="Login to your Blog App account"
                />
            </Helmet>

            <Container maxWidth="lg">
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    {/* Left Side - Image */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: { xs: "none", md: "block" } }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <img
                                src={image}
                                alt="Login illustration"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Right Side - Login Form */}
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={10}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                maxWidth: 500,
                                mx: "auto",
                            }}
                        >
                            <Box sx={{ textAlign: "center", mb: 4 }}>
                                <Avatar
                                    sx={{
                                        backgroundColor: "primary.main",
                                        m: "auto",
                                        width: 60,
                                        height: 60,
                                        mb: 2,
                                        boxShadow:
                                            "0 8px 24px rgba(14, 165, 233, 0.3)",
                                    }}
                                >
                                    <LockIcon sx={{ fontSize: 30 }} />
                                </Avatar>

                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        background:
                                            "linear-gradient(45deg, #0ea5e9, #764ba2)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Welcome Back
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Sign in to your account to continue
                                </Typography>
                            </Box>

                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginScheme}
                                onSubmit={(values, actions) => {
                                    login(values);
                                    actions.resetForm();
                                }}
                                component={(props) => <LoginForm {...props} />}
                            />

                            <Box sx={{ textAlign: "center", mt: 3 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Don't have an account?{" "}
                                    <Button
                                        component={Link}
                                        to="/register"
                                        variant="text"
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 600,
                                            color: "primary.main",
                                            "&:hover": {
                                                backgroundColor: "primary.50",
                                            },
                                        }}
                                    >
                                        Sign up here
                                    </Button>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Login;
