import httpClient from './httpClient';

describe('test httpClient', () => {
    test('test httpClient logIn to reject without a valid User', () => {
        expect(() => httpClient.logIn({})).toThrow('No token received.');
    });
});