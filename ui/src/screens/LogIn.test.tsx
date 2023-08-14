import React from 'react';
import { render, screen } from '@testing-library/react';
import {LogIn} from './LogIn';

test('renders LogIn screen', () => {
    render(<LogIn logIn={() => null} setLogInSuccess={() => null} logInSuccess={false} />);
    const logInTitle = screen.getByText(/Log In/i);
    expect(logInTitle).toBeInTheDocument();
    const logInEmail = screen.getByPlaceholderText('Email');
    expect(logInEmail).toBeInTheDocument();
    const logInPassword = screen.getByPlaceholderText('Password');
    expect(logInPassword).toBeInTheDocument();
    const logInButton = screen.getByRole('button', { name: /Log In/i });
    expect(logInButton).toBeInTheDocument();
});
