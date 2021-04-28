import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';


function Edit(): JSX.Element {

  const { getIdTokenClaims } = { getIdTokenClaims:"RERFGR"}

  let history = useHistory();
  let { movieId: movieId } = useParams();

  interface IValues {
    [key: string]: any;
  }

  const [movie, setMovie] = useState()
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/polyflix/movie/${movieId}`);
      const json = await response.json();
      setMovie(json)
    }
    fetchData();    
  }, [movieId]);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const submitSuccess: boolean = await submitForm();
    setSubmitSuccess(submitSuccess);
    setLoading(false);

    setTimeout(() => {
      history.push('/');
    }, 1500);
  }

  const submitForm = async (): Promise<boolean> => {
    try {
      const accessToken = getIdTokenClaims;
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/polyflix/edit?movieID=${movieId}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "authorization": `Bearer ${accessToken}`
        }),
        body: JSON.stringify(values)
      });
      return response.ok;      
    } catch(ex) {
      return false;
    }
  }

  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({ [e.currentTarget.id]: e.currentTarget.value })
  }

  return (
    <div className={'page-wrapper'}>
    {movie &&
      <div className={"col-md-12 form-wrapper"}>
        <h2> Edit Movie  </h2>

        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The movie has been edited successfully!
                        </div>
        )}
        <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
          <div className="form-group col-md-12">
            <label htmlFor="title"> Title </label>
            <input type="text" id="title" defaultValue={movie.title} onChange={(e) => handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="description"> Description </label>
            <input type="text" id="description" defaultValue={movie.description} onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="body"> Write Content </label>
            <input type="text" id="body" defaultValue={movie.body} onChange={(e) => handleInputChanges(e)} name="body" className="form-control" placeholder="Enter content" />
          </div>

          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Edit Movie
            </button>
            {loading &&
              <span className="fa fa-circle-o-notch fa-spin" />
            }
          </div>
        </form>
      </div>
    }
  </div>
  )
}

export default Edit;