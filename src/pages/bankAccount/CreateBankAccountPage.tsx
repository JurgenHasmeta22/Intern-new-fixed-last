// #region "Importing stuff"
import axios from "axios";
import { useState } from "react";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateBankAccountPage.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal } from "@mui/material";

import Demo from "../../main/components/Modals/testModal";
import DemoNested from "../../main/components/Modals/nestedTestModal";
// #endregion

export default function CreateBankAccountPage() {
  // #region "Local State react hooks"
  const [code, setCode] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [currencyId, setCurrencyId] = useState<any>("");
  const [balance, setBalance] = useState<any>("");

  const theme = createTheme();
  // #endregion

  // #region "Event listeners"
  async function handleSubmitForm(e: any) {
    e.preventDefault();

    const bankData = {
      code: code,
      name: name,
      currencyId: Number(currencyId),
      balance: Number(balance),
    };

    console.log(bankData);

    if (code === "" || name === "" || currencyId === "" || balance === "") {
      toast.warn("You cant proceed without completing all the required fields");
    } else {
      let result = await axios.post(`/bankaccount`, bankData);

      // console.log(result)

      if (result.status === 200) {
        toast.success("Bank account was created successfully!");
      }
    }
  }
  // #endregion

  return (
    <div className="bankAccount-page-wrapper">
      <HeaderCommon />

      {
        //#region "Old form no MUI"
      }

      {/* <div className="bankAccount-wrapper">

                <form className="form-wrapper" onSubmit={function (e) { 
                    handleSubmitForm(e) 
                }}>

                    <div className="create-wrapper-account">

                        <label>
                            <span>Code of the BankAccount: </span>
                        </label>

                        <input type="text" onChange={ function(e: any) {
                            setCode(e.target.value)
                        }} />

                    </div>

                    <div className="create-wrapper-account">

                        <label>
                            <span>Name of the Bank: </span>
                        </label>

                        <input type="text" onChange={ function(e: any) {
                            setName(e.target.value)
                        }} />

                    </div>

                    <div className="create-wrapper-account">

                        <label>
                            <span>Currency used in that bank account: </span>
                        </label>

                        <input type="text" onChange={ function(e: any) {
                            setCurrencyId(e.target.value)
                        }} />

                    </div>

                    <div className="create-wrapper-account">

                        <label>
                            <span>Balance (amount of money in the bank account): </span>
                        </label>

                        <input type="text" onChange={ function(e: any) {
                            setBalance(e.target.value)
                        }} />

                    </div>

                    <button type="submit">
                        Create bank account
                    </button>
                    

                </form>

            </div> */}

      {
        // #endregion
      }

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 14,
              marginBottom: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Create Bank Account
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={(e: any) => {
                handleSubmitForm(e);
              }}
              sx={{ mt: 6 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-code"
                    name="bankCode"
                    required
                    fullWidth
                    id="bankCode"
                    label="Code of the BankAccount: "
                    autoFocus
                    onChange={(e: any) => {
                      setCode(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nameBank"
                    label="Name of the Bank: "
                    name="nameBank"
                    autoComplete="family-bank"
                    onChange={(e: any) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="currencyBank"
                    label="Currency Id of the bank account: "
                    name="currencyBank"
                    autoComplete="currency"
                    onChange={(e: any) => {
                      setCurrencyId(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="balance"
                    label="Amount of money in the bank: "
                    name="balanceBank"
                    autoComplete="balance"
                    onChange={(e: any) => {
                      setBalance(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 5 }}
              >
                Create Bank Account
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <div className="modal-caller-wrapper">
        <Demo />
        <DemoNested />
      </div>

      <FooterCommon />
    </div>
  );
}
