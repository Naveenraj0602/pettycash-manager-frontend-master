import React, { useState } from 'react';
import {  Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, Typography, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; 
import { useFormik } from 'formik';
import * as yup from 'yup';


// Define your validation schema
const userValidationSchema = yup.object({
  userName: yup.string().required('Provide User Name'),
  emailId: yup.string().email('Invalid email format').required('Please provide your email address'),
  password: yup.string().min(8, 'Password should be at least 8 characters').required('Please provide the password'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: '',
      emailId: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle your form submission logic here
    },
  });

  return (<div className="signupPageBackground">
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
      <CssBaseline />
      <FontAwesomeIcon icon={faUserPlus} />
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="userName"
              name="userName"
              required
              fullWidth
              id="userName"
              label="User Name"
              autoFocus
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="emailId"
              label="Email Address"
              name="emailId"
              autoComplete="email"
              value={formik.values.emailId}
              onChange={formik.handleChange}
              error={formik.touched.emailId && Boolean(formik.errors.emailId)}
              helperText={formik.touched.emailId && formik.errors.emailId}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
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
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
  );
};

export default SignUp;
