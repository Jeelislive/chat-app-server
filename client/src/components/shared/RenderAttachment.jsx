import React from 'react'
import { transformImage } from '../../lib/features'
import { FileOpen } from '@mui/icons-material';

const RenderAttachment = (file, url) => {
    switch (file) {
        case "video":
          return  <video src={ url } preload="none" controls width={ " 200px " } />
            
        case "audio":
        return    <audio src={ url } preload='none' controls />
            
        case "image":
          return  <img src={ transformImage(url, 200) } alt="attachment" style={ {
                width: "200px",
                height: "200px",
                objectFit: "contain",
            } } />
            
        default:
          return  <FileOpen />
    }
}

export default RenderAttachment