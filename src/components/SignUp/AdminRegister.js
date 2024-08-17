import * as React from "react";
import Button from "@mui/material/Button";
import { CustomTextField } from "../../global";
import {
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../reducers/redux/auth/auth.action";

export const AdminRegister = () => {
  const dispatch = useDispatch();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            occupation: "",
            tools: "",
            password: "",
            confirmPassword: "",
            role: "Admin",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phoneNumber: Yup.string()
              .matches(/^[0-9]+$/, "Phone number must only contain digits")
              .min(10, "Phone number must be at least 10 digits")
              .max(15, "Phone number can't be longer than 15 digits")
              .required("Phone number is required"),
            occupation: Yup.string().required("Required"),
            tools: Yup.string().required(
              "Please enter tools/technolgies separated by commas."
            ),
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
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm password is required"),
          })}
          onSubmit={(payload) => {
            dispatch(register(payload));
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
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    name="firstName"
                    varient="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    name="lastName"
                    varient="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Last Name"
                    autoFocus
                  />
                </Grid>
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
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    name="phoneNumber"
                    varient="outlined"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Phone"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    error={Boolean(touched.occupation && errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    name="occupation"
                    varient="outlined"
                    value={values.occupation}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Occupation"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    error={Boolean(touched.tools && errors.tools)}
                    helperText={touched.tools && errors.tools}
                    name="tools"
                    varient="outlined"
                    value={values.tools}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Tools And Technologies"
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
                <Grid item xs={12}>
                  <CustomTextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    name="confirmPassword"
                    varient="outlined"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    label="Confirm Password"
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
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
