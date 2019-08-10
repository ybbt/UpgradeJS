import React from 'react';

import { BrowserRouter, Route, Redirect} from 'react-router-dom';

import Film from '../Film';
import Pagination from '../Pagination';

import style from './style.module.css'

class Main extends React.Component{

  render(){

    return (
      <div className={style.main}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          {/* <Redirect from="/" to="/1" /> */}
          <Route path="/:page" component={Page} />
        </BrowserRouter>
      </div>

    );
    
  }
}

function Home (){
  
    return (
      <Redirect from="/" to="/1" />
    );

}

class Page extends React.Component{

  state = { 
    movies: [],
    // voteAvarage: 0,
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
    console.log("helly");
    let page = this.props.match.params.page ? this.props.match.params.page : 1;
    this.ApiService(`https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=${page}`, this.setStateMovies.bind(this));

    this.ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
  }

  componentDidUpdate(prevProps) {

    if (prevProps.match.params.page !== this.props.match.params.page) {
      console.log(this.props.match.params.page);
      this.ApiService(`https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=${this.props.match.params.page}`, this.setStateMovies.bind(this));

      this.ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
    }
  }
  

  render(){
    return (
      <div >
        <div className={style.films}>
          {this.state.movies.map(item => {
          return (
            <div key={item.id} className={style.film}>
              <Film src={item.backdrop_path} year={item.release_date} name={item.title} voteAvarage={item.vote_average} genre={item.genre_ids.map(id => this.state.genres[id])}/>
            </div>
            )
          })}
        </div>
        <Pagination 
          pages={this.state.pages} 
          activePage={this.props.match.params.page}
          visiblePages = {3}
          firstEndVisiblePage = {2}
        />
      </div>
    );
  }
}

export default Main;

