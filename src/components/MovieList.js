import React from 'react'


const MovieList = (props) => {

    const FavouriteComponent = props.favouriteComp;
    const movieRatingList = props.movieRatingList;
    console.log(movieRatingList);
    return (
        <>
            
            { props.movies.map((movie,index) => (

                <div key={index} className='image-container d-flex justify-content-start m-3'>
                    <img src={ movie.Poster!=='N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300' } alt="movie"></img>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                        
                        <FavouriteComponent />
                    </div>
                    <div className='overlay d-flex flex-column align-items-center justify-content-center'>
                        
                        <div className='font-weight-bold m-2'>
                            {movie.Title} ({movie.Year})
                        </div>
                        <div className='d-inline-flex mt-2 mb-4'>
                            <a href={'https://www.imdb.com/title/'+movie.imdbID}><img className='imdb_logo mr-4' src='https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png' alt='movie' ></img></a>
                            <span ><svg 
                            width="22" 
                            height="22" 
                            className='mb-1 mr-2'
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="rgb(244, 197, 23)" 
                            role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
                            </svg>{movieRatingList[index]}</span>
                        </div>                        

                        <FavouriteComponent />

                    </div>
                </div>
                
            ))}

        </>
    )
}

export default MovieList
