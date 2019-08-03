import React from 'react';

import { /* Link */ NavLink} from "react-router-dom";

import style from './style.module.css'

function Pagenation(props) {

    return (
      <div className={style.pages}>
        {props.pages.map((item, index) => {return <NavLink to={`/${item}`} key={index} className={style.page} activeClassName={style.active}>{item}</NavLink>})}
      </div>
    );
  }
  
  export default Pagenation;