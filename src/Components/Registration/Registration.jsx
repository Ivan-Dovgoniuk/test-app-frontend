import './Registration.scss'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {registrationUser} from '../../slices/userSlice';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Registration() {

    const dispatch = useDispatch();

    const {userLoadingStatus} = useSelector(state=>state.user)

    const [status,setStatus]=useState(false)
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const userData = {
        username,
        email,
        password
    }
    const enterUsername = (e)=>{
        setUsername(e.target.value)
    }
    const enterEmail= (e)=>{
        setEmail(e.target.value)
    }
    const enterPassword = (e)=>{
        setPassword(e.target.value)
    }

    const onSendUserData = (e)=>{
        e.preventDefault();
        dispatch(registrationUser(userData))
        setStatus(true)
    }

    const button = userLoadingStatus == 'idle' || userLoadingStatus == 'error' ? <button type='submit'>Registration</button>
                                            :
                                             <LoadingButton loading variant="outlined" type="submit">
                                                Registration
                                             </LoadingButton>

if(status & userLoadingStatus == "idle" & userLoadingStatus !== "error"){
   return  <div className='alert'>
                <Alert sx={{flex:1}} severity="info">
                    <AlertTitle sx={{color:'Blue'}}>Activate your email</AlertTitle>
                            We sent link on yor email
                </Alert>
            </div>
}

const registrationForm =
                        <form className="registration-form"
                              onSubmit={(e)=>onSendUserData(e)}>
                            <div className="title">
                                <h2>
                                    Registration
                                </h2>
                            </div>
                            <div className="form-item">
                                <label htmlFor="username">
                                        Your Name
                                    <input id="username" 
                                            type="text" 
                                            value={username}
                                            minLength={1}
                                            onChange={(e)=>enterUsername(e)}/>
                                </label>  
                            </div> 
                            <div className="form-item">
                                <label htmlFor="email">
                                    Enter your email
                                    <input id="surname" 
                                        type="email"
                                        value={email}
                                        onChange={(e)=>enterEmail(e)}/>
                            </label>  
                            </div>
                            <div className="form-item">
                                <label htmlFor="password">
                                        Enter your Password
                                    <input id="password" 
                                            type="password"
                                            value={password}
                                            minLength={1}
                                            onChange={(e)=>enterPassword(e)}/>
                                </label> 
                            </div>
                            <div className="submit-button">
                                    {button}
                            </div>
                        </form>
    return(
        <section className="registration">
            <div className="container">
               {registrationForm}
            </div>
        </section>
    )
}

