
import React,{useState,useEffect,useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import { SearchBox } from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';


const App = () => {

  const [movies,setMovies] = useState([]);

  const [movieRatingList, setMovieRatingList] = useState([]);

  const [searchVal,setSearchVal] = useState('batman');

  const [favourites,setFavourites] = useState([]);


  const onWheel = e => {
		e.preventDefault();
		const container = scrollRef.current;
		const containerScrollPosition = scrollRef.current.scrollLeft;
	
		container.scrollTo({
		  top: 0,
		  left: containerScrollPosition + e.deltaY
		});
	  };

	  const onWheel1 = e => {
		e.preventDefault();
		const container = scrollRef1.current;
		const containerScrollPosition = scrollRef1.current.scrollLeft;
	
		container.scrollTo({
		  top: 0,
		  left: containerScrollPosition + e.deltaY
		});
	  };
	  
	  const scrollRef = useRef(null);
	  const scrollRef1 = useRef(null);


  const getMovieInfo = async (imdbID) => {

      const url = 'http://www.omdbapi.com/?apikey=b46fa339&i='+imdbID;
  
      const response = await fetch(url);
  
      const resJSON = await response.json();

      //console.log('rating :'+resJSON.imdbRating)
      
      return resJSON.imdbRating
       
  }

  const getMovieRequest = async (searchVal) => {

    const url=`http://www.omdbapi.com/?s=${searchVal}&apikey=b46fa339`

    const response = await fetch(url);

    const resJson = await response.json();

    console.log(resJson);

    if(resJson.Search){

      setMovies(resJson.Search);

      const movArr = await Promise.all(resJson.Search.map(async (item,index) => {
        
      return getMovieInfo(item.imdbID);
        
      }));

      console.log(movArr)
      setMovieRatingList(movArr);

    }

  }

  useEffect(() => {
    
    getMovieRequest(searchVal);

  }, [searchVal]);

  useEffect(() => {

    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    if(movieFavourites){
      setFavourites(movieFavourites);
    }
  },[])

  const saveToLocalStorage = (item) => {

    localStorage.setItem('react-movie-app-favourites', JSON.stringify(item))

  }

  const addFavouriteMovie = (movie) => {
    
    let newFavouriteList = []
    favourites.includes(movie) ? newFavouriteList =  favourites : newFavouriteList = [...favourites,movie]
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);

  }

  const removeFavouriteMovie = (movie) => {

    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }



  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader header='Movies' />
        <SearchBox  searchVal={searchVal} setSearchVal={setSearchVal}/>
      </div>
      <div className='row m-1' ref={scrollRef} onWheel={onWheel} >
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} movieRatingList={movieRatingList} favouriteComp = {AddFavourites} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieHeader header='Favourites' />
      </div>      
      <div className='row m-1' ref={scrollRef1} onWheel={onWheel1} >
        <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} movieRatingList={movieRatingList} favouriteComp = {RemoveFavourites} />
      </div>      
    </div>
  );
}

export default App;
