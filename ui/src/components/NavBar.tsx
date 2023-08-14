import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {logOut} from "../store/user/actions";
import {connect} from "react-redux";
import {User} from "../store/user/User";
import {ThunkDispatch} from "redux-thunk";

interface Props {
	currentUser?: User,
	logOut: Function
}
export const NavBar = ({currentUser, logOut}: Props) => {
	const navigate = useNavigate();
	return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{currentUser
				? (
					<span>
						<Link to="/vip">VIP</Link>
						<a onClick={(e) => {
							e.preventDefault();
							logOut();
							navigate('/login');
						}} href="/logout">Log Out</a>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
}

interface IState {
}
const mapStateToProps = (state: IState) => {
	return {
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
	return {
		logOut: () => dispatch(logOut()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);