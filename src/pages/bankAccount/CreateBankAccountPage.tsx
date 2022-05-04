import { useState } from "react";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import "./CreateBankAccountPage.css"

export default function CreateBankAccountPage() {

    const [code, setCode] = useState<any>("")
    const [name, setName] = useState<any>("")
    const [currencyId, setCurrencyId] = useState<any>("")
    const [balance, setBalance] = useState<any>("")

    return (

        <div className="bankAccount-page-wrapper">

            <HeaderCommon />

            <div className="bankAccount-wrapper">

                <form className="form-wrapper">

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
                    

                </form>

            </div>

            <FooterCommon />

        </div>

    )

}