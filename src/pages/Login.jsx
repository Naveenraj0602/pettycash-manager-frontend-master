import * as React from "react";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from '@mui/icons-material/Login';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import backendInstance from "../instances/serverConnection";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import "../pages/loginsignup.css"
import { Navigate } from "react-router-dom";

const userValidationSchema = yup.object({
  emailId: yup.string().email().required("Please provide your email address"),
  password: yup.string().required("Please provide the password"),
});

const Login = () => {
  //Reducers
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.profileReducer);

  //Password Visibility state handler
  const [showPassword, setShowPassword] = useState(false);

  // User Login form setup using Formik
  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (authUser) => {
      authenticateUser(authUser);
    },
  });

  //User Authentication Function
  const authenticateUser = (authUser) => {
    backendInstance
      .post("/api/auth/login", authUser)
      .then((res) => {
        if (!res) {
          throw new Error("Response is undefined");
        }
        formik.resetForm();
        alert(res.data.message);
        let data = res.data;
        localStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: res.data.accessToken,
            emailId: res.data.emailId,
            userID: res.data._id,
          })
        );
        dispatch({ type: "LOGIN_SUCCESSFULL", data });
      })
      .catch((error) => {
        console.error("Error occurred during login request:", error);
        alert("An error occurred during login. Please try again later.");
      });
  };


  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  
  return (<div className="loginPageBackground">
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 2,
      mt: 'auto',
      mb: 'auto',
      borderRadius: 2,
      boxShadow: 3,
      background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0))',
      backdropFilter: 'blur(10px)',
    }}>
      <Box
        sx={{
          marginTop: 8, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <LoginIcon />

        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          className="form-styling"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-text-input-emailId"
                label="Email address"
                type="text"
                size="small"
                fullWidth
                value={formik.values.emailId}
                name="emailId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailId && "emailId" in formik.errors}
                helperText={
                  formik.touched.emailId && formik.errors.emailId
                    ? formik.errors.emailId
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-text-input-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                fullWidth
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && "password" in formik.errors}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              //onChange={(event) => setRating(event.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: "75%" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item sx={{ mt: 2 }}>
              <Link href="/register" variant="h5">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
  );
};

export default Login;
