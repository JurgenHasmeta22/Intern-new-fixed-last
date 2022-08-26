// #region "Importing stuff"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import useGetUser from "../../main/hooks/useGetUser";
import { RootState } from "../../main/store/redux/rootState";
import {
  IBankAccount,
  IBankAccountName,
  invalidateCart,
} from "../../main/store/stores/cart/cart.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CheckoutPage.css";
import { useEffect, useRef } from "react";
// #endregion

export default function CheckoutPage() {
  // #region "Toast and some timeout stuff"
  const notify = () => toast.success("Payment was succesfully done!");
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current); // uses useRef hook to do this and clear timeout in a one way
  }, []);
  // #endregion

  // #region "React hooks"
  const user = useGetUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // #endregion

  // #region "Redux state"
  const totalValue: number = useSelector(
    (state: RootState) => state.cart.totalValue
  );
  const totalValueConverted: number = useSelector(
    (state: RootState) => state.cart.totalValueConverted
  );

  const selectedBankAccount: IBankAccount = useSelector(
    (state: RootState) => state.cart.selectedBankAccount
  );
  const selectedBankAccountName: IBankAccountName = useSelector(
    (state: RootState) => state.cart.selectedBankAccountName
  );
  const selectedBankAccountNameOnly: string = useSelector(
    (state: RootState) => state.cart.selectedBankAccountNameOnly
  );

  const bankAccounts: IBankAccount[] = useSelector(
    (state: RootState) => state.cart.bankAccounts
  );
  const selectedCurrencyDescNameOnly: string = useSelector(
    (state: RootState) => state.cart.selectedCurrencyDescNameOnly
  );
  // #endregion

  // #region "Helpers functions"
  const handleFormSubmitPayment = async (e: any) => {
    e.preventDefault();

    const newBankAccounts = [...bankAccounts];
    const bankAccountFinal = newBankAccounts.find(
      (bankAccount) => bankAccount.name === selectedBankAccountNameOnly
    );

    // console.log(bankAccountFinal)

    const transactionData = {
      bankAccountId: bankAccountFinal?.id,
      action: 1,
      amount: totalValueConverted,
      description: `Payment of ${user?.username}`,
      isActive: true,
    };

    // console.log(transactionData)

    if (totalValue !== 0 && selectedBankAccount?.balance > totalValue) {
      let result = await axios.post(`/banktransaction`, transactionData);

      // console.log(result)

      if (result.status === 200) {
        dispatch(invalidateCart());

        notify();

        timerRef.current = setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } else {
      toast("You cant proceed for a payment with no total value to pay", {
        autoClose: 2000,
      });
    }
  };
  // #endregion

  return (
    <>
      <HeaderCommon />

      <section className="container-payment">
        <form
          className="form-payment"
          onSubmit={function (e) {
            handleFormSubmitPayment(e);
          }}
        >
          <div className="container-form-payment">
            <h1>Payment details checkout</h1>

            <label>
              <span>
                Full name : {user.firstName} {user.lastName}{" "}
              </span>
            </label>

            <label>
              <span>Email: {user.email} </span>
            </label>

            <label>
              <span>Phone: {user.phone} </span>
            </label>

            <label>
              <span>Total payment amount is: {totalValueConverted} </span>
            </label>

            <label>
              <span>
                Currency Selected to pay: {selectedCurrencyDescNameOnly}{" "}
              </span>
            </label>

            <label>
              <span>
                Bank account selected by you is: {selectedBankAccount?.name}{" "}
              </span>
            </label>

            <button type="submit" value="Submit">
              Proceed to checkout
            </button>
          </div>
        </form>
      </section>

      <FooterCommon />
    </>
  );
}
