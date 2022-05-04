// #region "Importing stuff, components and also importing pieces of state etc"
import { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./RegisterPage.css"
import {RootState} from '../../main/store/redux/rootState'
import { navigateTo } from "../../main/store/stores/navigation/navigation.store"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../main/store/stores/user/user.store"
import onRegister from "../../main/store/stores/user/register.store.on-register"

import { 
    setFirstName, 
    setLastName, 
    setEmailRegister, 
    setBirthDate,
    setPhoneNumber,
    setUserNameRegister,
    setPasswordRegister
} from "../../main/store/stores/register/register.store"

import IRegister from "../../main/interfaces/IRegister"
import IUser from "../../main/interfaces/IUser"
// #endregion 


const RegisterPage : FC = ()=> {


    // #region "Using react hooks and other stuff"
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // #endregion


    // #region "Getting the state from redux toolkiit with using use Selector"
    const firstName = useSelector((state: RootState) => state.registration.firstName);
    const lastName = useSelector((state: RootState) => state.registration.lastName);
    const username = useSelector((state: RootState) => state.registration.username);
    const birthdate = useSelector((state: RootState) => state.registration.birthdate);
    const phone = useSelector((state: RootState) => state.registration.phone);
    const email = useSelector((state: RootState) => state.registration.email);
    const password = useSelector((state: RootState) => state.registration.password);
    // #endregion
    
    
    // #region "Form Register event handler"
    const registerData: IUser = {
        firstName,
        lastName,
        username,
        birthdate,
        phone,
        email,
        password
    }

    const handleRegisterUser = (e:any) => {

        e.preventDefault()

        fetch('http://reimusabelli-001-site1.itempurl.com/api/authentication/register', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(registerData)
        
        })
        .then(resp => resp.json())
        .then(data => {
            // dispatch(setUser(data))
            // console.log(data)
        })

    }
    // #endregion

    
    // console.log(registerData)

    return (

        <>

            <div className="signup-page-wrapper">

                <div className="main-wrapper">

                    <form id="signup-form" onSubmit={function (e) {
                        e.preventDefault()
                        dispatch(onRegister(registerData))
                        // handleRegisterUser(e)
                        // navigate("../dashboard");
                    }}>
                        
                        <h1>Bank System</h1>

                        <label id="firstname" htmlFor="">

                            <input type="text" name = "firstName" placeholder="Enter your firstname" required onChange={function (e) {
                                dispatch(setFirstName(e.target.value))
                            }}/>

                        </label>

                        <label id="lastname" htmlFor="">

                            <input type="text" name = "lastName" placeholder="Enter your lastname" required onChange={function (e) {
                                dispatch(setLastName(e.target.value))
                            }}/>

                        </label>

                        <label id="username" htmlFor="">

                            <input type="text" name = "username" placeholder="Enter your username" required onChange={function (e) {
                                dispatch(setUserNameRegister(e.target.value))
                            }}/>

                        </label>

                        <label htmlFor="">

                            <input type="text" name = "email" id="email" placeholder="Enter your email" onChange={function (e) {
                                dispatch(setEmailRegister(e.target.value))
                            }}/>

                        </label>

                        <label id="username" htmlFor="">

                            <input type="phone" name = "phone" placeholder="Enter your phone number" required onChange={function (e) {
                                dispatch(setPhoneNumber(e.target.value))
                            }}/>

                        </label>

                        <label id="username" htmlFor="">

                            <input type="date" name = "birthdate" placeholder="Enter your birthday" required onChange={function (e) {
                                dispatch(setBirthDate(e.target.value))
                            }}/>

                        </label>

                        <label htmlFor="">
                            
                            <input
                                type="password"
                                name = "password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                onChange={function (e) {
                                    dispatch(setPasswordRegister(e.target.value))
                                }}
                            />

                        </label>

                        <label htmlFor="">
                            <button>Sign Up</button>
                        </label>

                        <label id="login-link-wrapper" htmlFor="">

                            You have an account?

                            <Link id="link" to={"../login"}>
                                Log In
                            </Link>
                            
                        </label>

                    </form>

                </div>

            </div>

        </>

    )
    
}

export default RegisterPage