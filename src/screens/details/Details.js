import { Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import Header from "../../common/header/Header";
import './Details.css'

function Details(props) {
  return (
    <div>
      <Header showBookNow={true} movieId={props.match.params.id} />
      <div className="back-container">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography>&#60; Back to Home</Typography>
        </Link>
      </div>
      <div>
      </div>
    </div>

  )
}

export default Details;