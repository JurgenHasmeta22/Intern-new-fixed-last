// #region "Importing stuff, components and also importing pieces of state etc"
import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";
import { RootState } from "../../main/store/redux/rootState";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  setFirstName,
  setLastName,
  setEmailRegister,
  setBirthDate,
  setPhoneNumber,
  setUserNameRegister,
  setPasswordRegister,
} from "../../main/store/stores/register/register.store";
import IUser from "../../main/interfaces/IUser";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const theme = createTheme();
  const dispatch = useDispatch();
  const firstName = useSelector(
    (state: RootState) => state.registration.firstName
  );
  const lastName = useSelector(
    (state: RootState) => state.registration.lastName
  );
  const username = useSelector(
    (state: RootState) => state.registration.username
  );
  const birthdate = useSelector(
    (state: RootState) => state.registration.birthdate
  );
  const phone = useSelector((state: RootState) => state.registration.phone);
  const email = useSelector((state: RootState) => state.registration.email);
  const password = useSelector(
    (state: RootState) => state.registration.password
  );

  const handleRegisterUser = (e: any) => {
    const registerData: IUser = {
      firstName,
      lastName,
      username,
      birthdate,
      phone,
      email,
      password,
    };
    e.preventDefault();
    fetch(
      "http://reimusabelli-001-site1.itempurl.com/api/authentication/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(registerData),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {});
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegisterUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e: any) => {
                      dispatch(setFirstName(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e: any) => {
                      dispatch(setLastName(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e: any) => {
                      dispatch(setEmailRegister(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="birthdate"
                    label="birthdate"
                    name="birthdate"
                    autoComplete="birthdate"
                    onChange={(e: any) => {
                      dispatch(setBirthDate(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e: any) => {
                      dispatch(setPhoneNumber(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    onChange={(e: any) => {
                      dispatch(setUserNameRegister(e.target.value));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e: any) => {
                      dispatch(setPasswordRegister(e.target.value));
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
                <Grid
                  item
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default RegisterPage;
