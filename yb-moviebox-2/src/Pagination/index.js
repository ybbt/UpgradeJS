import React from 'react';

import { /* Link */ NavLink} from "react-router-dom";

import style from './style.module.css'

function Pagination(props) {

  function setPagination(_pages, _activePage){
    const pages = +_pages;
    const activePage = +_activePage;

    const visiblePages = 3;
    const firstEndVisiblePage = 2;
    const halfVisiblePages = Math.floor(visiblePages/2);


    let arrAllPages = [];

    let tempArrFirstPages = [];
    let tempArrLastPages = [];
    let tempArrVisiblePages = [];

    let resultArrPages = []; 

    //  < visiblePages ... firstEndVisiblePage >

    //  < 1 -2- 3 ... 24 25 > 


    //  < firstEndVisiblePage ... visiblePages ... firstEndVisiblePage >

    //  < 1 2 ... 10 -11- 12 ... 24 25 >


    //  < firstEndVisiblePage ... visiblePages >

    //  < 1 2 ... 23 -24- 25 >

    for(let i = 0; i < pages; i++){
      arrAllPages.push({text: i + 1, page: i+1});
    }

    if(pages > 8){
      if(activePage > firstEndVisiblePage+halfVisiblePages+1 && activePage <= (pages - (firstEndVisiblePage+halfVisiblePages+1))){
          for(let i = 0; i < firstEndVisiblePage; i++){
              tempArrFirstPages.push(arrAllPages[i]);

              tempArrLastPages.push(arrAllPages[(pages-1)-(firstEndVisiblePage-1) + i]);
          }
          for(let i = 0; i < visiblePages; i++){
              tempArrVisiblePages.push(arrAllPages[((activePage-1)-halfVisiblePages) + i]);
          }
          tempArrVisiblePages.unshift({
            text: '...', 
            page: (activePage-visiblePages) < 1 ? 1 : (activePage-visiblePages),
          });
          tempArrVisiblePages.push({
            text: '...', 
            page: ((activePage+visiblePages) > pages) ? tempArrVisiblePages[visiblePages-1].page : (activePage+visiblePages),
          });
      } else if (activePage <= firstEndVisiblePage+halfVisiblePages+1) {
          for(let i = 0; i < firstEndVisiblePage; i++){
              tempArrLastPages.push(arrAllPages[(pages-1)-(firstEndVisiblePage-1) + i]);
          }
          for(let i = 0; i < activePage+halfVisiblePages; i++){
              tempArrVisiblePages.push(arrAllPages[i]);
          }
          tempArrVisiblePages.push({
            text: '...', 
            page: ((activePage+visiblePages) > pages) ? tempArrVisiblePages[visiblePages-1].page : (activePage+visiblePages),
          });
          
      } else if(activePage > (pages - (firstEndVisiblePage+halfVisiblePages+1))){
          for(let i = 0; i < firstEndVisiblePage; i++){
              tempArrFirstPages.push(arrAllPages[i]);   
          }
          for(let i = 0; i < (pages-activePage)+halfVisiblePages+1; i++){
              tempArrVisiblePages.push(arrAllPages[(activePage-halfVisiblePages-1)+i]);
          }
          tempArrVisiblePages.unshift({
            text: '...', 
            page: (activePage-visiblePages) < 1 ? 1 : (activePage-visiblePages),
          });
      }

      resultArrPages = (new Array({text: '<', page: activePage-1})).concat(tempArrFirstPages, tempArrVisiblePages, tempArrLastPages, (new Array({text: '>', page: activePage+1})));

    } else {
      resultArrPages = arrAllPages;
    }
    
    return resultArrPages;
  }

  return (
    <div className={style.pages}>
      {setPagination(props.pages, props.activePage).map((item, index) => {return <NavLink to={`/${item.page}`} key={index} className={style.page} activeClassName={style.active}>{item.text}</NavLink>})}
    </div>
  );
}
  
  export default Pagination;