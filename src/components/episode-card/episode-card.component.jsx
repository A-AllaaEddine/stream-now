import './episode-card.styles.scss';

const EpisodeCard = ({seasonEp, selectEpisode}) => {
    return (
        <div className='episode-card-container' onClick={() => selectEpisode(seasonEp)}>
            <div  className={`${!seasonEp.thumbnail ? "no-background" : ""} episode-image-container`}>
                <img  src={seasonEp.thumbnail} alt={`${seasonEp.name}`} />
            </div>
            <div className='episode-name'>
                <h3>{seasonEp.name || seasonEp.title}</h3>
            </div>
        </div>
    )
}

export default EpisodeCard;