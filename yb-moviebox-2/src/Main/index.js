import React from 'react';

import { BrowserRouter, Route, Redirect} from 'react-router-dom';

import Film from '../Film';
import Pagenation from '../Pagenation';

import style from './style.module.css'

class Main extends React.Component{

  render(){

    return (
      <BrowserRouter>
        <Redirect from="/" to="/1" />
        <Route path="/:page" component={Page} />
      </BrowserRouter>
    );
    
  }
}

class Page extends React.Component{

  state = { 
    movies: [],
    pages: 1, 
    genres: {},
  };

  ApiService(responseString, setStateFunc){
    fetch(responseString)
      .then(
        response => response.ok ? response.json() : Promise.reject(Error('Failed to load'))
      )
      .then(
        setStateFunc,
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

    this.ApiService('https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=1&region=UA', this.setStateMovies.bind(this));

    this.ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
  }

  componentDidUpdate(prevProps) {

    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.ApiService(`https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=${this.props.match.params.page}&region=UA`, this.setStateMovies.bind(this));

      this.ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
    }
  }
  

  render(){
    let pagesArr = [];
    for (let index = 1; index <= this.state.pages; index++) {
      pagesArr.push(index);
    }
    return (
      <div >
        <div className={style.films}>
          {this.state.movies.map(item => {
          return (
            <div key={item.id} className={style.film}>
              <Film src={item.poster_path} name={item.title} genre={item.genre_ids.map(id => this.state.genres[id])}/>
            </div>
            )
          })}
        </div>
        <Pagenation pages={pagesArr} />
      </div>
    );
  }
}

export default Main;

