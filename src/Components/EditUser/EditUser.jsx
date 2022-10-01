import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, fetchUser} from '../../slices/userSlice'
import './EditUser.scss'
import LoadingButton from '@mui/lab/LoadingButton';

export default function EditUser() {

    const dispatch = useDispatch()
    
    const {email,username} = useSelector(state=>state.user.user)
    const userLoadingStatus = useSelector(state=>state.user.userLoadingStatus)
    const isAuth = useSelector(state=>state.user.isAuth)

    useEffect(()=>{
        dispatch(fetchUser())
  },[isAuth,email,username])

    
    const [newUsername,setNewUsername]= useState('')
    const [newEmail,setNewEmail]= useState('')
    const [newPassword,setNewPassword]= useState('')

    const newUserData = newPassword.length !== 0 
            
                                                ? 

    {
        password:newPassword,
        username:newUsername.length !== 0 ? newUsername : undefined,
        email:newEmail.length !== 0 ? newEmail : undefined
    }   

                                                :

    {
        username:newUsername.length !== 0 ? newUsername : undefined,
        email:newEmail.length !==0 ? newEmail : undefined
    }


   const onSendNewData = (e)=>{
        e.preventDefault()
        dispatch(editUser(newUserData))
        if(!userLoadingStatus == "error"){
            alert("User data is changed")
        }
   }




   const button = userLoadingStatus == 'idle' || userLoadingStatus == 'error' ? <button type='submit'>Edit</button>
   :
    <LoadingButton loading variant="outlined" type="submit">
       Edit
    </LoadingButton>

    return(
        
        <section className="editUser">
            <div className="container">
                <form className="editUser-form"
                      onSubmit={(e)=>onSendNewData(e)}>
                    <div className="title">
                        <h2>
                            Edit user
                        </h2>
                    </div>
                    <div className="form-item">
                        <label htmlFor="username">
                                New name
                            <input id="username" 
                                    placeholder={username}
                                    type="text"
                                    value={newUsername}
                                    onChange={(e)=>setNewUsername(e.target.value)}/>
                        </label>  
                    </div> 
                    <div className="form-item">
                        <label htmlFor="email">
                                Enter new email
                            <input id="surname" 
                                    type="email"
                                    placeholder={email}
                                    value={newEmail}
                                    onChange={(e)=>setNewEmail(e.target.value)}/>
                        </label>  
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">
                                Enter new Password
                            <input id="password" 
                                type="password"
                                value={newPassword}
                                minLength="4"
                                onChange={(e)=>setNewPassword(e.target.value)}/>
                        </label> 
                    </div>
                    <div className="submit-button">
                              {button}
                    </div>
                </form>
            </div>
        </section>
    )
}

