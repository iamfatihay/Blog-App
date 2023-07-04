import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";

export const loginScheme = object({
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: string().required("Password is required"),
});

const LoginForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
        />
        <Button variant="contained" sx={{ backgroundColor: "#ff6333" }} type="submit">
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export default LoginForm;
