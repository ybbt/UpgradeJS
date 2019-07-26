import React from 'react';

import style from './style.module.css'

function Pagenation(props) {
    console.log(props.pages);
    let pagesArr = [];
    for (let index = 1; index <= props.pages; index++) {
        pagesArr.push(index);
        
    }
    console.log(pagesArr);
    return (
      <div>
        {pagesArr.map((item, index) => {return <a href="./" key={index} className={style.pages}>{item}</a>})}
      </div>
    );
  }
  
  export default Pagenation;