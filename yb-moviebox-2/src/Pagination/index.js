import React from 'react';

import { /* Link */ NavLink} from "react-router-dom";

import style from './style.module.css'

function Pagination(props) {

  function setPagination(pages, activePage){
    let pageArrResult = [];
    let pagesArr = [];

    for (let index = 1; index <= pages; index++) {
      pagesArr.push({index : index, view : index});
    }

    const pagesBefor = 3;
    const pagesAfter = 2;
    const allPages = pagesBefor + pagesAfter;

    if (pages > allPages) {
      if (activePage > pagesBefor && activePage < pages - (allPages-1)) {
        for (let index = 0; index < pagesBefor; index++) {
          pageArrResult[index + 1] = pagesArr[(+activePage + 1) - (pagesBefor - index)];
        }
        for (let index = 0; index < pagesAfter; index++) {
          pageArrResult[index + allPages] = pagesArr[pagesArr.length/* -1 */ - (pagesAfter - index)];
        }
        pageArrResult[0] = {index : pagesArr[0].index, view : "<"};
        pageArrResult[4] = {index : pageArrResult[3].index + 1, view : "..."};
        pageArrResult[7] = {index : pagesArr[pagesArr.length-1].index, view : ">"};
      } else if (activePage <= pagesBefor){
        for (let index = 0; index < allPages; index++) {
          pageArrResult[+index + 1] = pagesArr[index];
        }
        pageArrResult[0] = {index : pagesArr[0].index, view : "<"};
        pageArrResult[6] = {index : pageArrResult[5].index + 1, view : "..."};
        pageArrResult[7] = {index : pagesArr[pagesArr.length-1].index, view : ">"};
      } else if (activePage >= pages - (allPages-1)){
        for (let index = 0; index < allPages; index++) {
          pageArrResult[+index + 2] = pagesArr[pagesArr.length/* -1 */ - (allPages - index)];
        }
        pageArrResult[0] = {index : pagesArr[0].index, view : "<"};
        pageArrResult[1] = {index : pageArrResult[2].index - 1, view : "..."};
        pageArrResult[7] = {index : pagesArr[pagesArr.length-1].index, view : ">"};
      }
    } else  {
      pageArrResult = pagesArr;
    }
    
    // pageArrResult = pagesArr;
    return pageArrResult;
  }

  return (
    <div className={style.pages}>
      {setPagination(props.pages, props.activePage).map((item, index) => {return <NavLink to={`/${item.index}`} key={index} className={style.page} activeClassName={style.active}>{item.view}</NavLink>})}
    </div>
  );
}
  
  export default Pagination;