import { Button, Typography, Box as MuiBox, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";
import { AccountCircle, Lock } from "@mui/icons-material";

export const loginScheme = object({
    email: string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: string().required("Password is required"),
});

const LoginForm = ({
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    setFieldValue,
}) => {
    const demoCredentials = [
        {
            email: "test@example.com",
            password: "test123",
            label: "🔥 Firebase Test User",
        },
    ];

    const handleDemoLogin = (credentials) => {
        setFieldValue("email", credentials.email);
        setFieldValue("password", credentials.password);
    };

    return (
        <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Test Credentials Section */}
                <MuiBox sx={{ mb: 2 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontWeight: 500 }}
                    >
                        🚀 Test Credentials (Click to auto-fill):
                    </Typography>
                    <Typography
                        variant="caption"
                        color="primary.main"
                        sx={{ mb: 1, display: "block", fontWeight: 600 }}
                    >
                        🔥 Firebase Authentication Active
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {demoCredentials.map((cred, index) => (
                            <Chip
                                key={index}
                                label={cred.label}
                                onClick={() => handleDemoLogin(cred)}
                                variant="outlined"
                                size="small"
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "primary.light",
                                        color: "white",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                            />
                        ))}
                    </Box>
                </MuiBox>

                <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                    InputProps={{
                        startAdornment: (
                            <AccountCircle
                                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                        ),
                    }}
                />
                <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                    InputProps={{
                        startAdornment: (
                            <Lock
                                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "primary.main",
                        "&:hover": {
                            backgroundColor: "primary.dark",
                        },
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1rem",
                    }}
                    type="submit"
                >
                    Sign In
                </Button>
            </Box>
        </Form>
    );
};

export default LoginForm;
