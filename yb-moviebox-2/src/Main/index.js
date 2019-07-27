import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Film from '../Film';
import Pagenation from '../Pagenation';

import style from './style.module.css'

class Main extends React.Component{

  state = { 
    movies: [],
    pages: 1, 
    genres: {},
  };

  ApiService(responseString, setStateFunc){
    // console.log('hello');
    fetch(responseString)
      .then(
        response =>
        response.ok ? response.json() : Promise.reject(Error('Failed to load'))
      )
      .then(
        /* this.setStateMovies.bind(this) */setStateFunc,
        error => console.log(error)
      );
  }

  setStateMovies(result){
    this.setState({
      movies: result.results,
      pages: result.total_pages,
    });
  }

  setStateGenres(result){
    let temp = {};
    result.genres.map(item => temp[item.id] = item.name);
    this.setState({
      genres: temp,
    });
  }

  componentDidMount() {
    // fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=1&region=UA')
    //   .then(
    //     response =>
    //     response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    //   )
    //   .then(
    //     result => {
    //       this.setState({
    //         movies: result.results,
    //         pages: result.total_pages,
    //       });

    //       // console.log(this.state.movies);
    //     },
    //     error => console.log(error)
    //   );
    this.ApiService('https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=1&region=UA', this.setStateMovies.bind(this));

    // fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA')
    //   .then(
    //     response => response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    //   )
    //   .then(
    //     result => {
    //       let temp = {};
    //       result.genres.map(item => temp[item.id] = item.name);
    //       this.setState({
    //         genres: temp,
    //       });
    //     },
    //     error => console.log(error)
    //   );

    this.ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
  }

  

  render(){
    let pagesArr = [];
    for (let index = 1; index <= this.state.pages; index++) {
      pagesArr.push(index);
    }
    return (
      <BrowserRouter>
        <div >
          <div className={style.films}>
            {this.state.movies.map(item => {
            return (
              <Film key={item.id} src={item.poster_path} name={item.title} genre={item.genre_ids.map(id => this.state.genres[id])}/>
              )
            })}
          </div>
          <Pagenation pages={pagesArr} />
        </div>
      </BrowserRouter>
    );
    
  }
}
export default Main;

