import React from 'react';

import Film from '../Film';
import Pagenation from '../Pagenation';

import style from './style.module.css'

class Main extends React.Component{

  state = { 
    movies: [],
    pages: 1, 
    genres: {},
  };

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=1&region=UA')
      .then(
        response =>
        response.ok ? response.json() : Promise.reject(Error('Failed to load'))
      )
      .then(
        result => {
          this.setState({
            movies: result.results,
            pages: result.total_pages,
          });

          // console.log(this.state.movies);
        },
        error => console.log(error)
      );

      fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA')
      .then(
        response =>
        response.ok ? response.json() : Promise.reject(Error('Failed to load'))
      )
      .then(
        result => {
          let temp = {};
          result.genres.map(item => temp[item.id] = item.name);
          this.setState({
            genres: temp,
          });
        },
        error => console.log(error)
      );
  }
    render(){
      return (
        <div >
          <div className={style.films}>
            {this.state.movies.map(item => {
            return (
              <Film key={item.id} src={item.poster_path} name={item.title} genre={item.genre_ids.map(id => this.state.genres[id])}/>
              )
            })}
          </div>
          <Pagenation pages={this.state.pages} />
        </div>
      );
      
    }
  }
  export default Main;