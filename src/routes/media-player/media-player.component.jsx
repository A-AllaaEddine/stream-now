import "./media-player.styles.scss";

import ReactPlayer from "react-player/lazy";

import { useParams } from "react-router-dom";

const MediaPlayer = () => {
  const { streamUrl, type } = useParams();

  console.log(streamUrl);
  var url;
  if (type === "trailer") {
    url = `https://www.youtube.com/embed/${streamUrl}?controls=0&showinfo=0&enablejsapi=1&fs=0&iv_load_policy=3&modestbranding=1&autoplay=0&rel=0&html5=1`;
  } else {
    url = decodeURIComponent(streamUrl.replaceAll("~", "%"));
  }

  return (
    <div className="media-player-container">
      {type === "trailer" ? (
        <ReactPlayer width="1080px" height="720px" controls url={`${url}`} />
      ) : (
        <p>Player is disactivated for streams....</p>
      )}
    </div>
  );
};

export default MediaPlayer;
