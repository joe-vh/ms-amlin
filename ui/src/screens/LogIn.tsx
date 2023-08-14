import React, {useState, useCallback, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {setLogInSuccess, logIn} from "../store/user/actions";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {User} from "../store/user/User";
type Props = {
	logIn: Function;
	setLogInSuccess: Function;
	logInSuccess: boolean;
}
export const LogIn = ({logIn, logInSuccess, setLogInSuccess}: Props) => {
	const [state, setState] = useState({
		fields: { email: '', password: ''}
	});

	const navigate = useNavigate();

	useEffect(() => {
		setLogInSuccess(false);
	}, [setLogInSuccess]);

	const onInputChange = (e: React.FormEvent<HTMLFormElement> & {
		target: HTMLButtonElement
	}) => {
		setState(state => ({
			fields: {
				...state.fields,
				[e.target.name]: e.target.value
			}
		}))
	}

	const onFormSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		logIn(state.fields);
	},[state, logIn]);

	useEffect(() => {
		if (logInSuccess === true) {
			setLogInSuccess(false);
			navigate('/');
		}
	}, [logInSuccess, navigate, setLogInSuccess]);

	const { email, password } = state.fields;

	return (
		<div className='LogIn'>
			<div className='row'>
				<div className='column column-33 column-offset-33'>
					<h1>Log In</h1>
					<form onChange={onInputChange} onSubmit={onFormSubmit}>
						<input type="text" placeholder="Email" name="email" value={email} />
						<input type="password" placeholder="Password" name="password" value={password} />
						<button>Log In</button>
					</form>
				</div>
			</div>
		</div>
	)
}

interface IState {
	user: {
		currentUser: User;
		logInSuccess: boolean;
	}
}

const mapStateToProps = (state: IState)  => {
	return {
		currentUser: state.user.currentUser,
		logInSuccess: state.user.logInSuccess
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
	return {
		logIn: (data: User) => dispatch(logIn(data)),
		setLogInSuccess: (data: boolean) => dispatch(setLogInSuccess(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)