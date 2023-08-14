import React, {useEffect} from 'react';
import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import VIP from './screens/VIP';
import Home from './screens/Home';
import {loadUser} from "./store/user/actions";
import {connect} from "react-redux";
import {User} from "./store/user/User";
import {ThunkDispatch} from "redux-thunk";

interface Props {
    currentUser: User;
    loadUser: Function;
}
function App({currentUser, loadUser}: Props) {
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
      <div className="App container">

        <NavBar currentUser={currentUser} />

        <Routes>

          <Route path="/login" element={<LogIn />} />

          {/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
            <Route path="/signup" element={<SignUp />} />

          <Route path="/vip" element={currentUser
                ? <VIP />
                : <Navigate to="/login" />
          } />

          <Route path="/" element={<Home />} />

        </Routes>
      </div>
  );
}

interface IState {
    user: {
        currentUser: User;
    };
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        loadUser: () => dispatch(loadUser())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
