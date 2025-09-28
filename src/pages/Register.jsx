import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
// import LockIcon from "@mui/icons-material/Lock"; // Not used
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Formik } from "formik";
import image from "../assets/register_img.svg";
import Grid from "@mui/material/Grid";
import RegisterForm, { registerSchema } from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import useAuthCall from "../hooks/useAuthCalls";
import { Helmet } from "react-helmet";

const Register = () => {
    const { register } = useAuthCall();

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 80px)", // Subtract header height
                background: "linear-gradient(135deg, #ec4899 0%, #6366f1 100%)",
                display: "flex",
                alignItems: "center",
                py: 4,
            }}
        >
            <Helmet>
                <title>Register - Blog App</title>
                <meta
                    name="description"
                    content="Create your Blog App account"
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
                                alt="Register illustration"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Right Side - Register Form */}
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={10}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                maxWidth: 600,
                                mx: "auto",
                            }}
                        >
                            <Box sx={{ textAlign: "center", mb: 4 }}>
                                <Avatar
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        m: "auto",
                                        width: 60,
                                        height: 60,
                                        mb: 2,
                                        boxShadow:
                                            "0 8px 24px rgba(118, 75, 162, 0.3)",
                                    }}
                                >
                                    <PersonAddIcon sx={{ fontSize: 30 }} />
                                </Avatar>

                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        background:
                                            "linear-gradient(45deg, #764ba2, #0ea5e9)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Join Our Community
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    Create your account to start writing amazing
                                    stories
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="primary.main"
                                    sx={{ fontWeight: 600 }}
                                >
                                    🔥 Firebase Authentication Active
                                </Typography>
                            </Box>

                            <Formik
                                initialValues={{
                                    username: "",
                                    first_name: "",
                                    last_name: "",
                                    email: "",
                                    image: "",
                                    bio: "",
                                    password: "",
                                    password2: "",
                                }}
                                validationSchema={registerSchema}
                                onSubmit={(values, actions) => {
                                    register(values);
                                    actions.resetForm();
                                }}
                                component={(props) => (
                                    <RegisterForm {...props} />
                                )}
                            />

                            <Box sx={{ textAlign: "center", mt: 3 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Already have an account?{" "}
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="text"
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 600,
                                            color: "secondary.main",
                                            "&:hover": {
                                                backgroundColor:
                                                    "secondary.light",
                                            },
                                        }}
                                    >
                                        Sign in here
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

export default Register;
