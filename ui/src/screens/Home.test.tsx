import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home title', () => {
    render(<Home />);
    const homeTitle = screen.getByText(/React Client App w\/ JWT Auth/i);
    expect(homeTitle).toBeInTheDocument();
});
