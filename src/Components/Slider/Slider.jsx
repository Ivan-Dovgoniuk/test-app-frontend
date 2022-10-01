import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper";

export default function Slider({images}) {

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {images.map(image=>{
                return (
                    <SwiperSlide key={image}>
                        <div  style={{width:"400px",height:"400px"}}>
                            <img src={image}/>
                        </div>  
                    </SwiperSlide>
                )})}
      </Swiper>
    </>
  );
}



               
