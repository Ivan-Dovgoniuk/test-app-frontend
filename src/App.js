import { Routes, Route } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home"
import Container from '@mui/material/Container';
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import EditUser from "./Components/EditUser/EditUser";
import { useSelector } from 'react-redux';
import DragonPage from './Components/DragonPage/DragonPage';
import FavoriteDragonsPage from './Components/FavoriteDragonsPage/FavoriteDragonsPage';
import RequireAuth from './Components/HOC/RequireAuth';
import AuthorizedUser from './Components/HOC/AuthorizedUser';

function App() {

  const isAuth = useSelector(state=>state.user.isAuth)


 

  return (
    <Container maxWidth="lg">
            <Header isAuth={isAuth}/>
        <Routes>
            <Route path="/" element={
                <RequireAuth>
                     <Home/>
                </RequireAuth>
            }/>
            <Route path="/login" element={
                <AuthorizedUser>
                    <Login/>
                </AuthorizedUser>
            }/>
            <Route path="/registration" element={
                <AuthorizedUser>
                    <Registration/>
                </AuthorizedUser>
            }/>
            <Route path="/editUser" element={
                <RequireAuth>
                    <EditUser/>
                </RequireAuth>
            }/>
            <Route path="/dragons/:id" element={
                  <RequireAuth>
                     <DragonPage/>
                  </RequireAuth>
            }/>
            <Route path="/favoriteDragons" element={
                  <RequireAuth>
                      <FavoriteDragonsPage/>
                  </RequireAuth>
            }/>
        </Routes>
    </Container>
   

  );
}

export default App;
