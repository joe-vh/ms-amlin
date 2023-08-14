import React from 'react';
import { render, screen } from '@testing-library/react';
import {SignUp} from './SignUp';
import {setSignUpErrorMessage} from "../store/user/actions";

test('renders SignUp screen', () => {
    render(<SignUp signUp={() => null} setSignUpSuccess={() => null} setSignUpErrorMessage={() => null} signUpSuccess={false} signUpErrorMessage={''} />);
    const signUpTitle = screen.getByText(/Sign Up/i);
    expect(signUpTitle).toBeInTheDocument();
    const signUpName = screen.getByPlaceholderText('Name');
    expect(signUpName).toBeInTheDocument();
    const signUpEmail = screen.getByPlaceholderText('Email');
    expect(signUpEmail).toBeInTheDocument();
    const signUpPassword = screen.getByText(/Password/i);
    expect(signUpPassword).toBeInTheDocument();
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(signUpButton).toBeInTheDocument();
});
