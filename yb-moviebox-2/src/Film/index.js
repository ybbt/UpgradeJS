import React from 'react';

import style from './style.module.css'

function Film(props) {
  let stringPathOrig = 'https://image.tmdb.org/t/p/original/';
  let stringPathAlt = 'http://via.placeholder.com/500x750png?text=image+is+missing';
  let stringPath = null;

  props.src ? stringPath = `${stringPathOrig}${props.src}` : stringPath = stringPathAlt;
  
  return (    
    <div className={style.film}>
      <div className={style.imageContainer}>
        <img src= {stringPath} alt="sorry" className={style.image}/>
        <div className={style.year}>{props.year.substr(0, 4)}</div>
      </div>
      <div className={style.about}>
        <div className={style.desc}>
          <h3 className={style.name}>{props.name}</h3>
          <div className={style.genres}>
            {props.genre.map((item, id) => {
              return (<span key={id} >{`${item}`}</span>)
            })}
          </div>
        </div>
        <div className={style.vote}><span className={style.voteVol}>{props.voteAvarage}</span></div>
      </div>
    </div>
  );
  }
  
  export default Film;
  // 399a504355fb64900d932566782c9bb5 