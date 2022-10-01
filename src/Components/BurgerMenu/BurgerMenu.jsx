import { Link }  from "react-router-dom"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logOut } from "../../slices/userSlice";
import IconButton from '@mui/material/IconButton';

export default function BurgerMenu() {

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut =()=>{
    dispatch(logOut())
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,color:"white" }}
          >
            <MenuIcon />
        </IconButton>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
            <Link style={{color:'black',textDecoration:'none'}} to="/">
                <Button color="inherit">Home page</Button>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={{color:'black',textDecoration:'none'}} to="/favoriteDragons">
              <Button color="inherit">Favorite dragons</Button>
            </Link> 
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link style={{color:'black',textDecoration:'none'}} to="/editUser">
              <Button color="inherit">Edit User</Button>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Button onClick={onLogOut} color="inherit">Login Out</Button>
        </MenuItem>
      </Menu>
    </>
  );
}

           

            
            