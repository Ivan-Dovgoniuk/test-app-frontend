import './Login.scss'
import {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser,sendActivationCode} from '../../slices/userSlice';
import LoadingButton from '@mui/lab/LoadingButton';


export default function Login() {


    const dispatch = useDispatch();

    const {userLoadingStatus,isAuth} = useSelector(state=>state.user)

    const [status,setStatus]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [activationCode,setActivationCode] = useState('')

    const userData = {
        email,
        password
    }

    const enterEmail= (e)=>{
        setEmail(e.target.value)
    }
    const enterPassword = (e)=>{
        setPassword(e.target.value)
    }
    const enterActivationCode= (e)=>{
        setActivationCode(e.target.value)
    }

    const onSendUserData = (e)=>{
        if(userData.password.length>=4){
            e.preventDefault();
            dispatch(loginUser(userData))
            setStatus(true)
        }
    }
    const onSendActivationCode =(e)=>{
        if(activationCode.length>0){
            e.preventDefault();
            dispatch(sendActivationCode({activationCode}))
        }
    }

    const button = userLoadingStatus == 'idle' || userLoadingStatus == 'error' ? <button type='submit'>Login</button>
                                            :
                                             <LoadingButton loading variant="outlined" type="submit">
                                                Login
                                             </LoadingButton>

    const login2FA = ( 
                        <form className="login-form2FA"
                              onSubmit={(e)=>onSendActivationCode(e)}>
                            <div className="title">
                                <h2>
                                    Enter Activation Code from your email
                                </h2>
                            </div>
                            <div className="form-item">
                                <label htmlFor="code">
                                        Activation Code
                                    <input id="code" 
                                            type="text" 
                                            value={activationCode}
                                            minLength={1}
                                            onChange={(e)=>enterActivationCode(e)}/>
                                </label>  
                            </div>
                            <div className="submit-button">
                                <button type='submit'>Send</button>
                            </div>
                        </form>
                    )

    const login = (
                    <form className="login-form"
                          onSubmit={(e)=>onSendUserData(e)}>
                        <div className="title">
                            <h2>
                                Login
                            </h2>
                        </div>
                        <div className="form-item">
                            <label htmlFor="email">
                                    Enter your email
                                <input id="email" 
                                        type="email"
                                        value={email}
                                        minLength={1}
                                        onChange={(e)=>enterEmail(e)}/>
                            </label>  
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">
                                    Enter your Password
                                <input id="password" 
                                        type="password"
                                        value={password}
                                        minLength={4}
                                        onChange={(e)=>enterPassword(e)}/>
                            </label> 
                        </div>
                        <div className="submit-button">
                            {button}
                        </div>
                    </form>
                    )

    return(
        <section className="login">
            <div className="container">
                    {(status & userLoadingStatus !== 'error' & userLoadingStatus !== 'loading' & !isAuth) ? login2FA : login}
            </div>
        </section>
    )
}



