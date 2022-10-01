import { Link } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {logOut} from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {isMobile} from 'react-device-detect';
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header({isAuth}) {


  const username = useSelector(state=>state.user.user.username)

  const dispatch = useDispatch();

  const onLogOut =()=>{
    dispatch(logOut())
  }

  const headerMenu = isMobile ? <BurgerMenu/> :
               <><Link style={{color:'white'}} to="/">
                    <Button color="inherit">Home page</Button>
                </Link>
                <Link style={{color:'white'}} to="/favoriteDragons">
                  <Button color="inherit">Favorite dragons</Button>
                </Link> 
                <Link style={{color:'white'}} to="/editUser">
                  <Button color="inherit">Edit User</Button>
                </Link>
                <Button onClick={onLogOut} color="inherit">Login Out</Button></>

  const elements = (isAuth ?
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {username}
            </Typography>
              {headerMenu}
        </Toolbar>
          :
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TEST APP
            </Typography>
            <Link style={{color:'white'}} to="/registration">
              <Button color="inherit">Registration</Button>
            </Link>
            <Link style={{color:'white'}} to="/login">
              <Button color="inherit">Login</Button>
            </Link>
        </Toolbar>
          )

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
          {elements}
      </AppBar>
    </Box>
  );
}