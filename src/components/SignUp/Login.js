import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { CustomTextField } from "../../global";
import { useNavigate } from "react-router-dom";
import {
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { login } from "../../reducers/redux/auth/auth.action";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login_data = useSelector((state) => state.auth.login_data);
  useEffect(() => {
    if (login_data.data?.data) {
      localStorage.setItem("token", login_data.data.data);
      navigate("/console/chat", { replace: true });
    }
  }, [login_data]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters long")
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .matches(/[0-9]/, "Password must contain at least one number")
              .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character"
              )
              .required("Password is required"),
          })}
          onSubmit={(payload) => {
            dispatch(login(payload));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextField
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    name="email"
                    varient="outlined"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    name="password"
                    varient="outlined"
                    value={values.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Password"
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};
