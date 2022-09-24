import axios from "axios";
import { useState } from "react";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateBankAccountPage.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Demo from "../../main/components/Modals/testModal";
import DemoNested from "../../main/components/Modals/nestedTestModal";

export default function CreateBankAccountPage() {
  const [code, setCode] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [currencyId, setCurrencyId] = useState<any>("");
  const [balance, setBalance] = useState<any>("");
  const theme = createTheme();

  async function handleSubmitForm(e: any) {
    e.preventDefault();
    const bankData = {
      code: code,
      name: name,
      currencyId: Number(currencyId),
      balance: Number(balance),
    };
    if (code === "" || name === "" || currencyId === "" || balance === "") {
      toast.warn("You cant proceed without completing all the required fields");
    } else {
      let result = await axios.post(`/bankaccount`, bankData);
      if (result.status === 200) {
        toast.success("Bank account was created successfully!");
      }
    }
  }

  return (
    <div className="bankAccount-page-wrapper">
      <HeaderCommon />
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
