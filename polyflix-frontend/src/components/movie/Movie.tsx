import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player'


function Movie() {

  let { movieId: movieId } = useParams();

  const [movie, setMovie] = useState<any>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/polyflix/movie/${movieId}`);
      const json = await response.json();
      setMovie(json);
    }
    fetchData().then(r => console.log(r));
  }, [movieId]);

    return (
        <section className="movie-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              {movie &&
                <div className="movie">
                  <div className="movie-top-area">
                    <h5 className="pre-title">Polyflix</h5>
                    <h3 className="title">
                      <span>
                        <b>{movie.title}</b>
                      </span>

                      <ReactPlayer url={movie.url} controls={true} width={1280} height={720}/>
                    </h3>

                    <p className="para">
                      {movie.body}
                    </p>
                  </div>
                </div>              
              }
            </div>

          </div>
        </div>
      </section>
    );
}

export default Movie;