import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signUp, setSignUpSuccess, setSignUpErrorMessage} from '../store/user/actions';
import {User} from '../store/user/User';
import {ThunkDispatch} from 'redux-thunk';
// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:

interface Props {
	signUp: Function;
	setSignUpSuccess: Function;
	setSignUpErrorMessage: Function;
	signUpSuccess: boolean;
	signUpErrorMessage: string;
}

export const SignUp = ({signUp, signUpSuccess, setSignUpSuccess, signUpErrorMessage, setSignUpErrorMessage}: Props) => {
	const[state, setState] = useState({
		fields: { name: '', email: '', password: ''}
	});

	const navigate = useNavigate();

	useEffect(() => {
		setSignUpSuccess(false);
		setSignUpErrorMessage('');
	}, [setSignUpSuccess, setSignUpErrorMessage]);

	const onInputChange = (e: React.FormEvent<HTMLFormElement> & {
		target: HTMLButtonElement
	}) => {
		setState({
			fields: {
				...state.fields,
				[e.target.name]: e.target.value
			}
		})
	}

	const onFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		signUp(state.fields);
		setState({ fields: { name: '', email: '', password: '' } });
	}

	useEffect(() => {
		if (signUpSuccess === true) {
			setSignUpSuccess(false);
			setSignUpErrorMessage('');
			navigate('/');
		}
	}, [signUpSuccess, setSignUpSuccess, setSignUpErrorMessage, navigate]);
	
	const { name, email, password } = state.fields;
	return (
		<div className='SignUp'>
			<div className='row'>
				<div className='column column-33 column-offset-33'>
					<h1>Sign Up</h1>
					<div className='error'>
						{signUpErrorMessage}
					</div>
					<form onChange={onInputChange} onSubmit={onFormSubmit}>
						<input type="text" placeholder="Name" name="name" value={name} />
						<input type="text" placeholder="Email" name="email" value={email} />
						<input type="password" placeholder="Password" name="password" value={password} />
						<button>Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	)
}
interface IState {
	user: {
		currentUser: User;
		signUpSuccess: boolean;
		signUpErrorMessage: string;
	}
}
const mapStateToProps = (state: IState) => {
	return {
		currentUser: state.user.currentUser,
		signUpSuccess: state.user.signUpSuccess,
		signUpErrorMessage: state.user.signUpErrorMessage
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
	return {
		signUp: (data: User) => dispatch(signUp(data)),
		setSignUpSuccess: (data: boolean) => dispatch(setSignUpSuccess(data)),
		setSignUpErrorMessage: (data: string) => dispatch(setSignUpErrorMessage(data))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)