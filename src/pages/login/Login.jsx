import "./login.css";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const email = useRef();
    const password = useRef();

    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value, password:password.current.value}, dispatch);
    };
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialMedia</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social Media share as much as you want.
                </span>
            </div>
            <form className="loginRight">
                <div className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                    <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password} />
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="secondary" size="20px" /> : "Log In"}</button>
                    <span className="loginForget">Forget Password?</span>
                    <button className="loginRegisterButton">Create a new account</button>
                </div>
            </form>
        </div>
    </div>
  )
}
