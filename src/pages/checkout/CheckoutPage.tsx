// #region "Importing stuff"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon"
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon"
import useGetUser from "../../main/hooks/useGetUser"
import { RootState } from "../../main/store/redux/rootState"
import { IBankAccount, IBankAccountName } from "../../main/store/stores/cart/cart.store"
import "./CheckoutPage.css"
// #endregion


export default function CheckoutPage() {


    // #region "React hooks"
    const user = useGetUser()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // #endregion


    // #region "Redux state"
    const totalValue: number = useSelector((state: RootState) => state.cart.totalValue);
    const selectedBankAccount: IBankAccount = useSelector((state: RootState) => state.cart.selectedBankAccount);
    const selectedBankAccountName: IBankAccountName = useSelector((state: RootState) => state.cart.selectedBankAccountName)
    const selectedBankAccountNameOnly: string = useSelector((state: RootState) => state.cart.selectedBankAccountNameOnly)
    const bankAccounts: IBankAccount[] = useSelector((state: RootState) => state.cart.bankAccounts)
    // #endregion

    const handleFormSubmitPayment = async (e:any) => {

        e.preventDefault()

        const newBankAccounts = [...bankAccounts]
        const bankAccountFinal = newBankAccounts.find(bankAccount => bankAccount.name === selectedBankAccountNameOnly )

        // console.log(bankAccountFinal)

        const transactionData = {
            bankAccountId: bankAccountFinal?.id,
            action: 1,
            amount: totalValue,
            description: `Payment of ${user?.username}`,
            isActive: true
        }

        // console.log(transactionData)

        if (totalValue !== 0) {

            let result = await axios.post(`/banktransaction`, transactionData);
            // console.log(result)

            if (result.status === 200) {
                // console.log("Your transaction was succesful")
                alert("Your transaction was succesful")
            }

        }

        else {
            alert("You cant proceed a payment with no total value to pay")
        }

    } 

    return (

        <>

        <HeaderCommon />
        
            <section className="container-payment">

                <form 
                    className="form-payment"
                    onSubmit={function (e) {
                        handleFormSubmitPayment(e)
                    }}
                >

                    <div className="container-form-payment">

                        <h1>Payment details checkout</h1>

                        <label>
                            <span>Full name : {user.firstName} {user.lastName} </span>
                        </label>

                        <label>
                            <span>Email:  {user.email} </span>
                        </label>

                        <label>
                            <span>Phone:  {user.phone} </span>
                        </label>

                        <label>
                            <span>Total payment amount is: {totalValue} </span>
                        </label>

                        <label>
                            <span>Bank account selected by you is: {selectedBankAccount?.name} </span>
                        </label>

                        <button type="submit" value="Submit">
                            Proceed to checkout
                        </button>

                    </div>

                </form>

            </section>

            <FooterCommon />
            
        </>

    )
    
}