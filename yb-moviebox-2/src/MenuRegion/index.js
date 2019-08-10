import React from 'react';

import { NavLink } from 'react-router-dom';

import style from './style.module.css'

function MenuRegion() {
  return (
    <div className={style.regionNav}>
      <NavLink className={style.navItem} activeClassName={style.active} to="/ALL/1">All regions</NavLink>
      <NavLink className={style.navItem} activeClassName={style.active} to="/UA/1">Ukraine region</NavLink>
    </div>
  );
}

export default MenuRegion;