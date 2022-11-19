import './media-player.styles.scss';

import ReactPlayer from 'react-player/lazy'

import { useState } from 'react';

import { useParams } from 'react-router-dom';

const MediaPlayer = () => {
  

    const { streamUrl } = useParams();
    const url = decodeURIComponent(streamUrl.replaceAll("~","%"));
    // console.log(url);

    return (
        <div className='media-player-container'>
            {/* <video className='video-player'    width='100' >
                <source src={url}  type="video/mp4"/>
            </video> */}
           <ReactPlayer 
                width="1080px"
                height="720px"
                controls
                url={`${url}`}
           />
           {/* <iframe src="https://www.youtube.com/watch?v=vOSpZwftRhg&ab_channel=AlmightyJava" width="640" height="480" ></iframe> */}
        </div>
    )
}

export default MediaPlayer;