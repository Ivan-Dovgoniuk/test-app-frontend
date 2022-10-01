import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteDragon, deleteFavoriteDragon, fetchUser } from '../../slices/userSlice';
import { useParams } from 'react-router-dom';
import './DragonPage.scss'
import Slider from '../Slider/Slider';
import { CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGetDragonsQuery } from '../../api/dragonsApi';
import CircularProgress from '@mui/material/CircularProgress';

export default function DragonPage() {

    const params = useParams();

    const {data=[],error,isLoading} = useGetDragonsQuery();
    const favoriteDragons = useSelector(state=>state.user.user.favoriteDragons)


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

    const dragon = data.filter(item=>{
        return item.id == params.id
    }).map (({name,id,description,wikipedia,flickr_images,dry_mass_kg,height_w_trunk,first_flight})=>{
        return(
            <Card key={id} sx={{flexGrow:1,maxWidth: 700 }}>
                <CardContent>
                    <Slider images={flickr_images}/>
                </CardContent>
                <CardContent>
                    <Typography sx={{marginBottom:'10px',fontSize:"50px"}} >
                        {name}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Mass:</strong>{dry_mass_kg} kg
                        <br/>
                        <strong>Height:</strong>{height_w_trunk.meters} m
                        <br/>
                        <strong>First flight:</strong>{first_flight}
                        <br/>
                        <strong><a href={wikipedia}>Wikipedia link</a></strong>
                        <br/>
                    </Typography>
                    <Typography  variant="h4" sx={{marginBottom:'10px',marginTop:"20px",textAlign:"center"}}>
                                Description
                    </Typography>
                    <Typography>
                                {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {favoriteButtons(id)}
                </CardActions>
        </Card>
        )
    })


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUser())
      },[])


    return(
        <section className="dragonPage">
           {dragon}
        </section>
    )

}