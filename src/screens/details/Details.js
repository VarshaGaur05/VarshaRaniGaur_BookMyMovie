import React, { useEffect, useState } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';
import StarRating from '../../common/starrating/StartRating';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AppLogo from '../../assets/logo.svg';
import { withStyles } from "@material-ui/core/styles";
// import { fontSize } from '@mui/system';

const styles = (theme) => ({
    commonClass: {
        fontWeight : 600
    },
    marginClass: {
        fontWeight : 600,
        marginTop: "16px"
    },
     commonMargin : {
        fontWeight: 600,
         margin: "16px 0" 
     },
     headline : {
        fontWeight: 700,
        color: "#000000",
        fontSize: "1.5rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "1.35417em",
        margin: 0
     },
     widthStyle :{
        width: "20%"
     }
  });

function Details(props) {

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

window.postMessage('text', '*');

const [movieDetails, setMovieDetails] = React.useState({
  artists: [],
  censor_board_rating: "",
  duration: 0,
  genres: [],
  id: "",
  poster_url: "",
  rating: 0,
  release_date: "",
  status: "",
  storyline: "",
  title: "",
  trailer_url: "",
  wiki_url: ""
});
const opts = {
  height: '390',
  width: '800',
  PlayerVars: {
      autoplay: 1
  }
};

const [defaultImage, setdefaultImage] = useState();

// replace image function
const replaceImage = (error) => {
    //replacement of broken Image
    setdefaultImage(AppLogo);
    error.target.src = defaultImage; 
}


async function loadDetails() {
const rawResponse = await fetch(props.baseUrl + "movies/" + props.match.params.id, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
});
const data = await rawResponse.json();
setMovieDetails(data);
}

function dateString(string) {
return new Date(string).toDateString();
}

const videoOnReady = (event) => {
event.target.pauseVideo();
}

const rateClickHandler = (event) => {
console.log(event.target);
}

useEffect(() => {
loadDetails();
}, []);

const { classes } = props;

return (
  <div>
    <Header showBookNow={true} movieId={props.match.params.id} />
          <div className="back-container">
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Typography>&#60; Back to Home</Typography>
              </Link>
              <div className="details-container">
                  <div style={{ width: "20%", marginLeft: "10px" }}>
                      <img src={movieDetails.poster_url} alt={movieDetails.title}  onError={replaceImage} />
                  </div>
                  <div style={{ width: "60%" }}>
                      <Typography className={classes.headline} component="h2">
                          {movieDetails.title}
                      </Typography>
                      <Typography className={classes.commonClass}>
                          Genres:
                      </Typography>{movieDetails.genres.join(", ")}
                      <Typography className={classes.commonClass}>
                          Duration:
                      </Typography>{movieDetails.duration}
                      <Typography className={classes.commonClass}>
                          Release Date:
                      </Typography>{dateString(movieDetails.release_date)}
                      <Typography className={classes.commonClass}>
                          Rating:
                      </Typography>{movieDetails.rating}
                      <Typography className={classes.marginClass}>
                          Plot:
                      </Typography>(<a href={movieDetails.wiki_url}>Wiki Link</a>){movieDetails.storyline}
                      <Typography className={classes.marginClass}>
                          Trailer:
                      </Typography>
                      <YouTube videoId={movieDetails.trailer_url.split("v=")[1]} opts={opts} onReady={videoOnReady} allow-presentation/>
                  </div>
                  <div className={classes.widthStyle}>
                      <Typography className={classes.commonClass}>
                          Rate this movie:
                          <StarRating
                              numberOfStars="5"
                              rating={movieDetails.rating}
                              onClick={rateClickHandler}
                          />
                      </Typography>
                      <Typography className={classes.commonMargin}>
                          Artists:
                      </Typography>
                      <ImageList cols={2} >               
                             {movieDetails.artists.map((artist) => (
                              <ImageListItem key={artist.id}>
                              <img src={artist.profile_url} alt="" />
                              <ImageListItemBar title={artist.first_name + " " + artist.last_name}></ImageListItemBar>
                                  </ImageListItem>
                              ))
                          }
                      </ImageList>
                  </div>
              </div>
          </div>
  </div>

)
}

export default withStyles(styles)(Details);



