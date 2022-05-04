import { FC, useEffect } from "react"
// import { useStore } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { useDispatch, useSelector } from "react-redux"
import {RootState} from '../../main/store/redux/rootState'
import onLogin from "../../main/store/stores/user/login.store.on-login"
import { setUserNameLogin, setPasswordLogin } from "../../main/store/stores/login/login.store"

const LoginPage : FC = ()=>{

    // #region "Using react hooks and other stuff"
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // #endregion

    const userName = useSelector((state: RootState) => state.login.userName);
    const password = useSelector((state: RootState) => state.login.password);

    return (

        <>

            <div className="login-page-wrapper">

                <div className="login-main-wrapper">

                    <form
                        id="login-form"

                        onSubmit={function (e) {
                            
                            e.preventDefault()

                            const data = {
                                userName,
                                password
                            }

                            dispatch(onLogin(data))
                            // navigate("../dashboard");

                        }}
                    >

                        <h1>Bank System</h1>

                        <label htmlFor="">

                            <input
                                type="text"
                                name="usernameLogin"
                                placeholder="Enter your userName: "
                                required
                                
                                onChange={function (e) {
                                    dispatch(setUserNameLogin(e.target.value))
                                }}
                            />

                        </label>

                        <label htmlFor="">

                            <input
                                type="password"
                                name="passwordLogin"
                                placeholder="Enter your password"
                                required
                                
                                onChange={function (e) {
                                    dispatch(setPasswordLogin(e.target.value))
                                }}
                            />

                        </label>

                        <label htmlFor="">
                            <button>Log In</button>
                        </label>

                        <label id="signup-link-wrapper" htmlFor="">

                            Don't have an account?{" "}

                            <Link id="link" to={"../register"}>

                                Sign Up

                            </Link>

                        </label>

                    </form>

                </div>

            </div>
            
        </>

    )
    
}

export default LoginPage