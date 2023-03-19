import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth,provider} from '../Firebase/Firebase'
import './Login.css'
function Login() {
    const navigate = useNavigate();
    const [value,setvalue] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [error,seterror] = useState('')
    const [loading,setloading] = useState(false)
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setvalue(data.user.email);
            localStorage.setItem('email', data.user.email);
            console.log(data)
            navigate("/");
        })
        
    }
    const handleSignin =()=>{
        seterror('');
        setloading(true);
        
        if (email == '' || password == '')
        {
            seterror('Required field is empty');
            setloading(false)
        } else {
            signInWithEmailAndPassword(auth,email,password).then((res)=>{
                console.log(res)
                navigate("/");
                setloading(false)
            }).catch((err)=>{
                console.log(err.code)
                seterror(err.message)
                setloading(false)
            })
        }
        
    }
    return (
        <>
            <div className="login">
                <div className="login-body">
                    <div className="logo">
                    <Link to='/'>
                            <img src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg" alt="Logo" width='140px' />
                            </Link>
                    </div>
                    <div className="google-login" onClick={handleClick}>
                        <p className="google-log"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png' alt='google'></img> Log in with google</p>
                    </div>
                    <div className="logs">
                        <div className="email">
                        <p><b>Email</b></p>
                        <input type='text' value={email} onChange={(e)=>setemail(e.target.value)}></input>
                        </div>
                       <div className="pass">
                        <p><b>Password</b></p>
                       <input type='password' value={password} onChange={(e) => setpassword(e.target.value)}></input>
                       
                        <button className="log-btn" onClick={handleSignin}>{loading ? 'loging...' :'Log In'}</button>
                    
                       </div>
                       <div className="err-msg" >{error}</div>
                       
                    </div>
                    <p>Don't have an account? <Link to='/signup' >Sign up</Link></p>
                </div>
               
            </div>
        </>
    )
}

export default Login