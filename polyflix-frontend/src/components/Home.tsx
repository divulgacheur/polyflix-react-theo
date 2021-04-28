import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Home():JSX.Element {
  let history = useHistory()
  const { isAuthenticated, getIdTokenClaims, user } = {user: {name: 'theo'} , isAuthenticated: "rrr", getIdTokenClaims:"toto"}

  const [movies, setMovies] = useState()

    const deleteMovie = async(id: string) => {
      const accessToken = await getIdTokenClaims;
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/polyflix/delete?movieID=${id}`, {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "authorization": `Bearer ${accessToken}`
        })
      });
      _removeMovieFromView(id);
      history.push('/');
    }

    const _removeMovieFromView = (id: string) => {
      // @ts-ignore
      const index = movies.findIndex((movie: { _id: string; }) => movie._id === id);
      // @ts-ignore
      movies.splice(index, 1);
    }

    useEffect(() => {
      const fetchMovies = async (): Promise<any> => {
        console.log(process.env.REACT_APP_SERVER_BASE_URL)
        const response = await fetch(process.env.REACT_APP_SERVER_BASE_URL + "/polyflix/movies");
        const json = await response.json();
        setMovies(json)
      }
      fetchMovies().then(r => "API down" + r);
    }, [])


  return (
          <section className="blog-area section">
          <div className="container">
            <div className="row">
              {movies && movies.map((movie: { title: React.ReactNode; _id: any; author: any; }) => (
                <div className="col-lg-4 col-md-6" key={movie._id}>
                <div className="card h-100">
                  <div className="single-movie movie-style-1">

                    <div className="polyflix-image">
                      <img src='/polyflix_logo' alt="Polyflix" />
                    </div>

                    <span className="avatar">
                      <img src="../images/240px-user-icon.png" alt="Profile" />
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
