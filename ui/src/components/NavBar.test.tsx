import React from 'react';
import { render, screen } from '@testing-library/react';
import {NavBar} from './NavBar';

test('renders NavBar component without currentUser', () => {
    render(<NavBar logOut={() => null} />);
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    const vipLink = screen.getByText(/VIP/i);
    expect(vipLink).not.toBeInTheDocument();
    const logOutLink = screen.getByText(/Log Out/i);
    expect(logOutLink).not.toBeInTheDocument();
    const logInLink = screen.getByText(/Log In/i);
    expect(logInLink).not.toBeInTheDocument();
    const signUpLink = screen.getByText(/Sign Up/i);
    expect(signUpLink).not.toBeInTheDocument();
});

test('renders NavBar component with currentUser', () => {
    render(<NavBar logOut={() => null} currentUser={{email: 'admin@example.com'}} />);
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    const vipLink = screen.getByText(/VIP/i);
    expect(vipLink).toBeInTheDocument();
    const logOutLink = screen.getByText(/Log Out/i);
    expect(logOutLink).toBeInTheDocument();
    const logInLink = screen.getByText(/Log In/i);
    expect(logInLink).toBeInTheDocument();
    const signUpLink = screen.getByText(/Sign Up/i);
    expect(signUpLink).toBeInTheDocument();
});