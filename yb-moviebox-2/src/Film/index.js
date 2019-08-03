import React from 'react';

import style from './style.module.css'

function Film(props) {
    return (
      
      <div className={style.film}>
        <img src={`https://image.tmdb.org/t/p/w500${props.src}`}  alt="sorry"/>
        <div className={style.desc}>
          <h3 className={style.name}>{props.name}</h3>
          <div className={style.genres}>
            {props.genre.map((item, id) => {
              return (<span key={id} >{`${item}`}</span>)
            })}
          </div>
        </div>
      </div>
    );
  }
  
  export default Film;
  // 399a504355fb64900d932566782c9bb5