import {isMobile} from 'react-device-detect';
import PullToRefresh from 'react-simple-pull-to-refresh';



export default function RequireMobile({children}) {

    const refresh =()=>{
        window.location.reload()
    }

    if(isMobile){
        return (<PullToRefresh onRefresh={refresh}>
                    {children}
                </PullToRefresh>
        )
    }else{
       return children 
    }    
}