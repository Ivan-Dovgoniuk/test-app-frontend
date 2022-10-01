import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import './FavoriteDragonsPage.scss'
import { useState } from "react";
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {deleteFavoriteDragon, fetchUser } from "../../slices/userSlice";
import { useGetDragonsQuery } from "../../api/dragonsApi";




export default function FavoriteDragonsPage() {

  const dispatch = useDispatch();

  const {data=[],error,isLoading} = useGetDragonsQuery();
  const favoriteDragonsID = useSelector(state=>state.user.user.favoriteDragons)

  const isAuth = useSelector(state=>state.user.isAuth)

    useEffect(()=>{
        dispatch(fetchUser())
    },[isAuth,favoriteDragonsID])

  const favoriteDragons = data.filter(item=>{
    return favoriteDragonsID.includes(item.id)
  })

  const [activePage,setActivePage] = useState(1)



  const numberDragonsOnPage = 1
  const numberOfPages = favoriteDragons.length/numberDragonsOnPage


    const getSlicer =(activePage)=>{
    return {
        bottom:activePage*numberDragonsOnPage - numberDragonsOnPage,
        top:activePage*numberDragonsOnPage
    }      
}
  const Slicer = getSlicer(activePage);

  const dragonsOnPage = favoriteDragons.slice(Slicer.bottom,Slicer.top)

  const onDeleteFavoriteDragon =(deletedDragon)=>{
    dispatch(deleteFavoriteDragon({deletedDragon}))
  }

  const renderElements =(dragonsOnPage)=>{
    return(
      dragonsOnPage.map(({flickr_images,id}) =>{
            return(
              <div className="item" key={id}>      
                <Link to ={`/dragons/${id}`}>
                    <img src={flickr_images[2]} alt=''/>
                </Link>
                <IconButton onClick={()=>onDeleteFavoriteDragon(id)} className="favorite" color="primary">
                    <ClearIcon color='error'/>
                </IconButton>
              </div>
            )
        })
    ) 
}
 const elements = renderElements(dragonsOnPage)

  return (
   <section className="dragons">
              {elements}
      <div className="pagination">
          {numberOfPages>1 && 
          <Pagination count={numberOfPages}
                      defaultPage={1}
                      onChange={(e,p)=>setActivePage(p)} />}
      </div>
   </section>
  );
}