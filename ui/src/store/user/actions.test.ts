import {logOut, loadUser, setLogInSuccess, setSignUpErrorMessage, setSignUpSuccess, setUserData} from './actions'

describe('test the actions', () => {
    test('test setUserData action', () => {
        expect(setUserData({id: 1, name: 'Alfred', email: 'alfred@gmail.com', password: 'password123'}))
            .toBe({id: 1, name: 'Alfred', email: 'alfred@gmail.com', password: 'password123'});
    });

    test('test setSignUpSuccess action', () => {
        expect(setSignUpSuccess(true))
            .toBe(true);
    });

    test('test setSignUpErrorMessage action', () => {
        expect(setSignUpErrorMessage('error'))
            .toBe('error');
    });

    test('test setLogInSuccess action', () => {
        expect(setLogInSuccess(false))
            .toBe(false);
    });

    test('test logOut action', () => {
        expect(typeof logOut())
            .toBe('function');
    });

    test('test loadUser action', () => {
        expect(typeof loadUser())
            .toBe('function');
    });

    // expect(() => httpClient.logIn({})).toThrow('No token received.');
});