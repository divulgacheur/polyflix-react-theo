import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movie from './components/movie/Movie';
import Edit from './components/movie/Edit';
import Create from './components/movie/Create';
import { LoginPage  } from './auth/LoginPage/LoginPage';
import { RegisterPage  } from './auth/RegisterPage/RegisterPage';


function App(): JSX.Element {

  return (
    <div className="App">
    <Navbar />
      <div className={'container'}>
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/post/:postId"} component={Movie}/>
          <Route path={"/edit/:postId"} component={Edit}/>
          <Route path={"/create"} component={Create} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/register"} component={RegisterPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
