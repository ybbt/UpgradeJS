import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import Header from './Header';
import Main from './Main';
import style from './App.module.css'

function App() {
  return (
    <div className={style.App}>
      <Header/>
      <Main/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
