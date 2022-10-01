import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"



export default function RequireAuth({children}) {

    const isAuth = useSelector(state => state.user.isAuth)

    if(!isAuth){
        return <Navigate to='/login'/>
    }

    return children

    
}