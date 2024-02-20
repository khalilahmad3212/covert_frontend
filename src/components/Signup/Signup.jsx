import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";


import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Logo from "../Home/Logo";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import login from "../../images/check2.webp";
import { Divider } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// const icons = [twitter, facebook, google];

const theme = createTheme();

export default function Signup() {


  const { email, setEmail } = useContext(UserContext);

  const { register } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (formData.get('password') !== formData.get('confirmPassword')) {
      toast('Password should be same!')
      return;
    }

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    register(data)
  };

  return (
    <div className=" max-w-[1440px] mx-auto h-screen lg:max-h-[800px]">
      <ThemeProvider theme={theme}>
        <Grid container component="main">
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <div className=" w-[150px] ml-1 mt-7 hidden md:block">
              <Logo />
            </div>
            <div
              className=" flex flex-col items-center justify-center mx-3 md:mx-4"
              sx={{
                mt: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <div className=" self-start mt-4">
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    fontSize: 20,
                    marginBottom: "3px",
                    color: "#3296ff",
                  }}
                >
                  Buy
                </Typography>
                <Divider
                  sx={{ width: "20%", height: "3px", bgcolor: "#3296ff", mb: 3 }}
                />
                <Typography>Enter the following details.</Typography>
              </div>
              <form
                className=" md:w-[600px] mt-3"
                onSubmit={handleSubmit}
              >
                <div className=" flex flex-col gap-5 md:flex-row">
                  <TextField
                    required
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    autoComplete="off"
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: "GrayText" },
                    }}
                    sx={{ flex: 1 }}
                    autoFocus
                  />

                  <TextField
                    required
                    label="Last Name"
                    variant="outlined"
                    name='lastName'
                    autoComplete="off"
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: "GrayText" },
                    }}
                    sx={{ flex: 1 }}
                  />
                </div>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="off"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  autoComplete="off"
                />
                {/* <Box sx={{ alignSelf: "start" }}>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      fontSize: 25,
                      mt: 4,
                      marginBottom: "5px",
                    }}
                  >
                    Payment Details
                  </Typography>
                </Box> */}

                {/* <TextField
                  label="Name on Card"
                  variant="outlined"
                  name='cardName'
                  fullWidth
                  autoComplete="off"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 15, color: "GrayText" },
                  }}
                />
                <div className=" relative mt-10">
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    name="cardNumber"
                    placeholder="1234 5678 1234 3456"
                    value={cardNumber}
                    onChange={(e) => cardNumberFormat(e.target.value, setCardNumber)}
                    fullWidth
                    autoComplete="off"
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: "GrayText" },
                    }}
                  />
                  <div className="absolute top-0 right-3 h-full">
                    <div className="flex gap-2 items-center h-full">
                      <input
                        type="text"
                        placeholder="MM"
                        name="cardMonth"
                        value={cardMonth}
                        onChange={(e) => restrictTo2(e.target.value, setCardMonth)}
                        className="max-w-[30px] focus:outline-none active:outline-none active:border-none border-b-2 border-black pl-1.5"
                      />

                      <input
                        type="text"
                        placeholder="YY"
                        name="cardYear"
                        value={cardYear}
                        onChange={(e) => restrictTo2(e.target.value, setCardYear)}
                        className=" max-w-[25px] focus:outline-none active:outline-none active:border-none border-b-2 border-black pl-1"
                      />

                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardCVV}
                        name="cardCvv"
                        onChange={(e) => restrictTo3(e.target.value, setCardCVV)}
                        className=" max-w-[35px] focus:outline-none active:outline-none active:border-none border-b-2 border-black pl-1"
                      />
                    </div>
                  </div>
                </div> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    p: 1,
                    bgcolor: "#716EDC",
                    "&:hover": {
                      backgroundColor: "#716EDC",
                    },
                  }}
                >
                  Sign UP
                </Button>
              </form>
              <p>Already have an Account? <Link to="/login" className=" text-primary ml-3 text-lg">Login</Link></p>
            </div>
          </Grid>
          <Grid
            xs={false}
            sm={4}
            md={6}
            pt={4}
            px={3}
            item
          >
            <Box sx={{
              // backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundImage: `url(${login})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: '100%',
              height: '100%'
            }}
              borderRadius={5}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}



/*
            <Box sx={{ alignSelf: "start" }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  fontSize: 25,
                  marginBottom: "5px",
                  width: "400px",
                }}
              >
                Upgrade your subscription to save hundreds.
              </Typography>
              <Divider
                sx={{ width: "20%", height: "3px", bgcolor: "#3296ff", mb: 3 }}
              />
            </Box>
*/