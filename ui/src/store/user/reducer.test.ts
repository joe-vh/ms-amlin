import reducer from './reducer'
import {SET_USER_DATA} from "../actionTypes";

describe('test the reducers', () => {
    test('test setUserData reducer', () => {
        const initialState = {
            currentUser: {
                email: null,
                name: null,
                password: null
            },
            logInSuccess: false,
            signUpSuccess: false,
            signUpErrorMessage: ''
        };

        const action = {
            type: SET_USER_DATA,
            data: {name: 'Alfred', email: 'alfred@gmail.com', password: 'password123'}
        }

        const expectedResult = {
            currentUser: {
                email: 'alfred@gmail.com',
                name: 'Alfred',
                password: 'password123'
            },
            logInSuccess: false,
            signUpSuccess: false,
            signUpErrorMessage: ''
        }

        expect(
            reducer(initialState, action))
            .toEqual(expectedResult);
    });
});