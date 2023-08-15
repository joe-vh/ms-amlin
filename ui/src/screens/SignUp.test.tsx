import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {SignUp} from './SignUp';
import userEvent from "@testing-library/user-event";

describe('test SignUp screen', () => {
    test('renders SignUp screen', () => {
        render(<SignUp signUp={() => null} setSignUpSuccess={() => null} setSignUpErrorMessage={() => null}
                       signUpSuccess={false} signUpErrorMessage={''}/>);
        const signUpTitle = screen.getByText(/Sign Up/i);
        expect(signUpTitle).toBeInTheDocument();
        const signUpName = screen.getByPlaceholderText('Name');
        expect(signUpName).toBeInTheDocument();
        const signUpEmail = screen.getByPlaceholderText('Email');
        expect(signUpEmail).toBeInTheDocument();
        const signUpPassword = screen.getByText(/Password/i);
        expect(signUpPassword).toBeInTheDocument();
        const signUpButton = screen.getByRole('button', {name: /Sign Up/i});
        expect(signUpButton).toBeInTheDocument();
    });

    test('should trigger prop when sign up is clicked', () => {
        const mockSignUp = jest.fn();

        render(<SignUp signUp={mockSignUp} setSignUpSuccess={() => null} setSignUpErrorMessage={() => null}
                       signUpSuccess={false} signUpErrorMessage={''}/>);

        fireEvent.click(screen.getByRole('button', {name: /Sign Up/i}));
        expect(mockSignUp).toHaveBeenCalledTimes(1);
    });

    test('should display text in email field', () => {
        render(<SignUp signUp={() => null} setSignUpSuccess={() => null} setSignUpErrorMessage={() => null}
                       signUpSuccess={false} signUpErrorMessage={''}/>);

        userEvent.type(screen.getByPlaceholderText('Email'), 'test@mail.com');
        expect(screen.getByPlaceholderText('Email')).toHaveValue('test@mail.com');
    });

    test('renders signUpErrorMessage', () => {
        render(<SignUp signUp={() => null} setSignUpSuccess={() => null} setSignUpErrorMessage={() => null}
                       signUpSuccess={false} signUpErrorMessage={'Validation error'}/>);

        const signUpErrorMessage = screen.getByText(/Validation error/i);
        expect(signUpErrorMessage).toBeInTheDocument();
    });
});

