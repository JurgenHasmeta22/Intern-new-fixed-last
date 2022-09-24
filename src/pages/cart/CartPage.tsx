import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import axios from "axios";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import "./CartPage.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import {
  IBankAccount,
  IBankAccountName,
  ICartProduct,
} from "../../main/store/stores/cart/cart.store";
import {
  deleteProductById,
  changeProductQuantity,
  invalidateCart,
  setSelectedBankAccount,
  setSelectedBankAccountName,
  setBankAccounts,
  setSelectedBankAccountNameOnly,
  setSelectedCurrencyDesc,
  setSelectedCurrencyDescNameOnly,
  setSelectedCurrencyDescName,
  setTotalValueConverted,
} from "../../main/store/stores/cart/cart.store";
import { setCurrencies } from "../../main/store/stores/dashboard/dashboard.store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ICurrency from "../../main/interfaces/ICurrency";

export default function BagPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsInTheCart: ICartProduct[] = useSelector(
    (state: RootState) => state.cart.products
  );
  const totalValue: number = useSelector(
    (state: RootState) => state.cart.totalValue
  );
  const currencies: ICurrency[] = useSelector(
    (state: RootState) => state.dashboard.currencies
  );
  const selectedBankAccount: IBankAccount = useSelector(
    (state: RootState) => state.cart.selectedBankAccount
  );
  const bankAccounts: IBankAccount[] = useSelector(
    (state: RootState) => state.cart.bankAccounts
  );
  const selectedCurrencyDescNameOnly: string = useSelector(
    (state: RootState) => state.cart.selectedCurrencyDescNameOnly
  );

  function handleOnChangeSelect(e: any) {
    dispatch(setSelectedBankAccountName(e.target.value));
  }
  function handleOnChangeBankAccount(e: any) {
    const newBankAccounts = [...bankAccounts];
    const bankAccountFinal = newBankAccounts.find(
      (bankAccount) => bankAccount.name === e.target.value
    );
    dispatch(setSelectedBankAccount(bankAccountFinal));
    dispatch(setSelectedBankAccountNameOnly(bankAccountFinal.name));
  }
  function handleOnChangeSelectCurrency(e: any) {
    dispatch(setSelectedCurrencyDescName(e.target.value));
  }
  function handleOnChangeCurrency(e: any) {
    const newCurrencies = [...currencies];
    const currencyFinal = newCurrencies.find(
      (currency) => currency.description === e.target.value
    );
    dispatch(setSelectedCurrencyDesc(currencyFinal));
    dispatch(setSelectedCurrencyDescNameOnly(currencyFinal.description));
  }
  function findingCurrenciesNamesForBankAccounts(currencyId: number) {
    const bankAccountCurrencyName: any = currencies?.find(
      (currency) => currency?.id === currencyId
    );
    return bankAccountCurrencyName?.description;
  }
  function convertingMoneyToOther() {
    const baseCurrency: any = setSelectedCurrencyDescNameOnly;
    const baseMoney: any = totalValue;
    const exchangeRateEuroToDollar: any = 1.055;
    const exchangeRateEuroToPaund: any = 0.85;
    const exchangeRateEuroToFranga: any = 1.04;
    const exchangeRateEuroToBitcoin: any = 0.000032;
    const finalMoneyEuroToDollar = baseMoney * exchangeRateEuroToDollar;
    const finalMoneyEuroToPaund = baseMoney * exchangeRateEuroToPaund;
    const finalMoneyEuroToFranga = baseMoney * exchangeRateEuroToFranga;
    const finalMoneyEuroToBitcoin = baseMoney * exchangeRateEuroToBitcoin;
    if (selectedCurrencyDescNameOnly === "Bitcoin") {
      dispatch(setTotalValueConverted(finalMoneyEuroToBitcoin));
      return finalMoneyEuroToBitcoin;
    } else if (selectedCurrencyDescNameOnly === "franga") {
      dispatch(setTotalValueConverted(finalMoneyEuroToFranga));
      return finalMoneyEuroToFranga;
    } else if (selectedCurrencyDescNameOnly === "Pound") {
      dispatch(setTotalValueConverted(finalMoneyEuroToPaund));
      return finalMoneyEuroToPaund;
    } else if (selectedCurrencyDescNameOnly === "dollar") {
      dispatch(setTotalValueConverted(finalMoneyEuroToDollar));
      return finalMoneyEuroToDollar;
    } else if (selectedCurrencyDescNameOnly === "PRILL") {
      dispatch(setTotalValueConverted(finalMoneyEuroToBitcoin));
      return finalMoneyEuroToBitcoin;
    }
  }
  const currenciesNew: ICurrency[] = currencies?.filter(
    (currency) =>
      currency?.description !==
      findingCurrenciesNamesForBankAccounts(selectedBankAccount?.currencyId)
  );

  async function getBankAccountsFromServer() {
    let result = await (
      await axios.get(`/bankaccount/get-all?PageNumber=1&PageSize=10`)
    ).data;
    dispatch(setBankAccounts(result.data));
    dispatch(setSelectedBankAccount(result.data[0]));
    dispatch(setSelectedBankAccountNameOnly(result.data[0]?.name));
  }
  async function getCurrenciesFromServer() {
    let result = await (
      await axios.get(`/currency/get-all?PageNumber=1&PageSize=10`)
    ).data;
    dispatch(setCurrencies(result.data));
    dispatch(setSelectedCurrencyDesc(result.data[0]));
    dispatch(setSelectedCurrencyDescNameOnly(result.data[0].description));
  }
  useEffect(() => {
    getBankAccountsFromServer();
    getCurrenciesFromServer();
  }, []);

  return (
    <>
      <div className="bag-menus-wrapper">
        <HeaderCommon />
        <section className="basket-container">
          <form id="filter-by-sort" className="form-cart">
            <label htmlFor="filter-by-type">
              <h3>
                Choose transaction currency(currency wich wich will be used):{" "}
              </h3>
            </label>
            <select
              name="filter-by-sort"
              id="filter-by-sort"
              onChange={function (e: any) {
                handleOnChangeSelectCurrency(e);
                handleOnChangeCurrency(e);
              }}
            >
              {currenciesNew?.length === 0 ? (
                <option value="Default">No Currency to choose</option>
              ) : (
                //@ts-ignore
                currenciesNew.map((currency) => (
                  <option key={currency.id} value={currency.description}>
                    {currency.description}
                  </option>
                ))
              )}
            </select>
            <span>
              The converted total value: {convertingMoneyToOther()}{" "}
              {selectedCurrencyDescNameOnly}{" "}
            </span>
            <label htmlFor="filter-by-type">
              <h3>Choose bank account: </h3>
            </label>
            <select
              name="filter-by-sort"
              id="filter-by-sort"
              onChange={function (e: any) {
                handleOnChangeSelect(e);
                handleOnChangeBankAccount(e);
              }}
            >
              {bankAccounts?.length === 0 ? (
                <option value="Default">No Bank Account</option>
              ) : (
                bankAccounts.map((bankAccount) => (
                  <option key={bankAccount.id} value={bankAccount.name}>
                    {bankAccount.name}
                  </option>
                ))
              )}
            </select>
            <div className="bankAccount-balance">
              <span>
                Total balance of bank account:{" "}
                <strong>{selectedBankAccount?.balance}</strong>
              </span>
            </div>
          </form>
          <h2>Your Orders Cart</h2>
          <ul>
            {productsInTheCart.map((productCart) => (
              <li key={productCart.product.id}>
                <article className="basket-container__item">
                  <img
                    src={`data:image/jpeg;base64,${productCart.product.base64Image}`}
                    alt={productCart.product.name}
                    width="90"
                  />
                  <p>{productCart.product.name}</p>
                  <p>
                    <span>Quantity: </span>
                    <select
                      name="total-options"
                      defaultValue={productCart.quantity}
                      onChange={function (e) {
                        dispatch(
                          changeProductQuantity({
                            productId: productCart.product.id,
                            quantity: Number(e.target.value),
                          })
                        );
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </p>
                  <button
                    onClick={function () {
                      navigate(`/products/${productCart.product.id}`);
                    }}
                  >
                    Go to product
                  </button>
                  <button
                    onClick={function () {
                      dispatch(deleteProductById(productCart.product.id));
                    }}
                  >
                    X
                  </button>
                </article>
              </li>
            ))}
          </ul>
          <div className="total-wrapper">
            <h3 className="total-cart">Your total: {totalValue}</h3>
          </div>
          <div className="button-wrapper-cart">
            <button
              className="button-proceed-payment"
              onClick={function () {
                if (
                  productsInTheCart?.length !== 0 &&
                  selectedBankAccount?.balance > totalValue
                ) {
                  navigate(`/transaction/checkout`);
                } else {
                  toast(
                    "You need to have products in the cart to proceed to checkout, or your bank account is not sufficent to proceed to payment",
                    { autoClose: 5000 }
                  );
                }
              }}
            >
              Proceed to payment
            </button>
            <button
              className="button-clear-cart"
              onClick={function () {
                dispatch(invalidateCart());
              }}
            >
              Clear Cart
            </button>
            <Link to="/createBankAccount" className="create-account-bank">
              Create a bank account
            </Link>
            <h3>
              Currency Description:{" "}
              {findingCurrenciesNamesForBankAccounts(
                selectedBankAccount?.currencyId
              )}
            </h3>
          </div>
        </section>
        <FooterCommon />
      </div>
    </>
  );
}
