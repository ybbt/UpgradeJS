import React from 'react';

import style from './style.module.css'

function Header() {
    return (
      <h1 className={style.title}>
        THEMOVIE<span className={style.bold}>BOX</span>
      </h1>
    );
  }
  
  export default Header;