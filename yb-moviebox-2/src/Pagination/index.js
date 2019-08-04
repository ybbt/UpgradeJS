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

    const pagesCentral = 3;
    const pagesAfter = 2;
    const allPages = pagesCentral + 2;

    if (pages > allPages) {
      if (activePage > pagesCentral-1 && activePage < pages - (pagesCentral-2)) {
        for (let index = 0; index < pagesCentral; index++) {
          pageArrResult[index + 3] = pagesArr[(+activePage + 1) - (pagesCentral - index)];
        }
        // for (let index = 0; index < pagesAfter; index++) {
        //   pageArrResult[index + allPages] = pagesArr[pagesArr.length/* -1 */ - (pagesAfter - index)];
        // }
        pageArrResult[0] = {index : pagesArr[0].index, view : "<"};
        pageArrResult[1] = pagesArr[0];
        pageArrResult[2] = {index : pageArrResult[3].index - 1, view : "..."};
        pageArrResult[6] = {index : pageArrResult[5].index + 1, view : "..."};
        pageArrResult[7] = pagesArr[pagesArr.length-1];
        pageArrResult[8] = {index : pagesArr[pagesArr.length-1].index, view : ">"};
      } else if (activePage <= pagesCentral-1){        
        for (let index = 0; index < pagesCentral; index++) {
          pageArrResult[+index + 1] = pagesArr[index];
        }
        for (let index = 0; index < pagesAfter; index++) {
          pageArrResult[index + allPages] = pagesArr[pagesArr.length/* -1 */ - (pagesAfter - index)];
        }
        pageArrResult[0] = {index : pagesArr[0].index, view : "<"};
        pageArrResult[4] = {index : pageArrResult[3].index + 1, view : "..."};
        pageArrResult[7] = {index : pagesArr[pagesArr.length-1].index, view : ">"};
      } else if (activePage >= pages - (pagesCentral-2)){
        for (let index = 0; index < pagesCentral; index++) {
          pageArrResult[+index + 4] = pagesArr[pagesArr.length/* -1 */ - (pagesCentral - index)];
        }
        for (let index = 0; index < pagesAfter; index++) {
          pageArrResult[index + 1] = pagesArr[index];
        }
        pageArrResult[0] = {index : pagesArr[0].index, view : "<"};
        pageArrResult[3] = {index : pageArrResult[4].index - 1, view : "..."};
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