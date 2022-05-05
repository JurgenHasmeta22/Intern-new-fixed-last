import axios from "axios";
import { useState } from "react";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreateBankAccountPage.css"

export default function CreateBankAccountPage() {

    const [code, setCode] = useState<any>("")
    const [name, setName] = useState<any>("")
    const [currencyId, setCurrencyId] = useState<any>("")
    const [balance, setBalance] = useState<any>("")

    async function handleSubmitForm(e: any) {
        
        e.preventDefault()

        const bankData = {
            "code": code,
            "name": name,
            "currencyId": currencyId,
            "balance": balance
        }

        let result = await axios.post(`/bankaccount`, bankData);

        if (result.status === 200) {
            toast.success("Bank account was created successfully!")
        }

    }
    
    return (

        <div className="bankAccount-page-wrapper">

            <HeaderCommon />

            <div className="bankAccount-wrapper">

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

            </div>

            <FooterCommon />

        </div>

    )

}