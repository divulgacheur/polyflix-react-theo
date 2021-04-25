import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';


function Home():JSX.Element {
  let history = useHistory()
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();

  const [movies, setMovies] = useState();
  const deleteMovie = async(id: string) => {
    const accessToken = await getIdTokenClaims();
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/polyflix/delete?movieID=${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "authorization": `Bearer ${accessToken.__raw}`
      })
    });
    _removeMovieFromView(id);
    history.push('/');
  }

  const _removeMovieFromView = (id: string) => {
    const index = movies.findIndex((movie: { _id: string; }) => movie._id === id);
    movies.splice(index, 1);
  }

  useEffect(() => {
    const fetchMovies = async (): Promise<any> => {
      console.log(process.env.REACT_APP_SERVER_BASE_URL)
      const response = await fetch(process.env.REACT_APP_SERVER_BASE_URL + "/polyflix/movies");
      const json = await response.json();
      setMovies(json)
    }
    fetchMovies();
  }, [])

    return (
        <section className="blog-area section">
        <div className="container">
          <div className="row">
            {movies && movies.map((movie: { title: React.ReactNode; _id: any; author: any; }) => (
              <div className="col-lg-4 col-md-6" key={movie._id}>
              <div className="card h-100">
                <div className="single-movie movie-style-1">

                  <div className="blog-image">
                    <img src="https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1563149789/blog-image_psvipq.jpg" alt="Blog" />
                  </div>

                  <span className="avatar">
                    <img src="http://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png" alt="Profile" />
                  </span>

                  <div className="blog-info">

                    <h4 className="title">
                      <span>
                        <b>{movie.title}</b>
                      </span>
                    </h4>
                  </div>
                </div>

                <ul className="movie-footer">
                  <li>
                    <Link to={`/movie/${movie._id}`} className="btn btn-sm btn-outline-secondary">View Movie </Link>
                  </li>
                  <li>
                    {
                      isAuthenticated && (user.name === movie.author) &&
                      <Link to={`/edit/${movie._id}`} className="btn btn-sm btn-outline-secondary">Edit Movie </Link>
                    }
                  </li>
                  <li>
                    {
                      isAuthenticated && (user.name === movie.author) &&
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteMovie(movie._id)}>Delete Movie</button>
                    }
                  </li>
                </ul>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default Home;
