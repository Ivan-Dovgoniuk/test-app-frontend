
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import './Home.scss'
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addFavoriteDragon, deleteFavoriteDragon, fetchUser } from "../../slices/userSlice";
import { useGetDragonsQuery } from "../../api/dragonsApi";
import CircularProgress from '@mui/material/CircularProgress';




export default function Home() {

  const dispatch = useDispatch();

  const favoriteDragons = useSelector(state=>state.user.user.favoriteDragons)
  const {isAuth,user} = useSelector(state=>state.user.user)

    useEffect(()=>{
        dispatch(fetchUser())
    },[isAuth,user])

    const {data=[],error,isLoading} =useGetDragonsQuery();



  const [activePage,setActivePage] = useState(1)



  const numberDragonsOnPage = 1
  const numberOfPages = data.length/numberDragonsOnPage


    const getSlicer =(activePage)=>{
    return {
        bottom:activePage*numberDragonsOnPage - numberDragonsOnPage,
        top:activePage*numberDragonsOnPage
    }      
}
  const Slicer = getSlicer(activePage);

  const dragonsOnPage = data.slice(Slicer.bottom,Slicer.top)


  const onAddFavoriteDragon =(newFavoriteDragon)=>{
    dispatch(addFavoriteDragon({newFavoriteDragon}))
  }
  const onDeleteFavoriteDragon =(deletedDragon)=>{
    dispatch(deleteFavoriteDragon({deletedDragon}))
  }


  const favoriteButtons = (dragonID)=>{

  const filteredFavoriteDragons = favoriteDragons.filter(item=>{
    return item == dragonID
  })

    if(filteredFavoriteDragons.length !== 0){
      return(
        <IconButton onClick={()=>onDeleteFavoriteDragon(dragonID)} className="favorite" color="primary">
            <FavoriteIcon color='error'/>
        </IconButton>
      )
    }else{
      return(
        <IconButton onClick={()=>onAddFavoriteDragon(dragonID)}  className="not-favorite" color="primary">
            <FavoriteBorderIcon color='error'/>
        </IconButton>
      )
     
    }
  }

  const renderElements =(dragonsOnPage)=>{
    return(
      dragonsOnPage.map(({flickr_images,id}) =>{
            return(
              <div className="item" key={id}>      
                <Link to ={`/dragons/${id}`}>
                    <img src={flickr_images[2]} alt=''/>
                </Link>
               {favoriteButtons(id)}
              </div>
            )
        })
    ) 
}
 const elements = renderElements(dragonsOnPage)
    return (
      <section className="dragons">
                {isLoading ?  <CircularProgress />: elements}
         <div className="pagination">
             {numberOfPages>1 && 
             <Pagination count={numberOfPages}
                         defaultPage={1}
                         onChange={(e,p)=>setActivePage(p)} />}
         </div>
      </section>
     );
}