import React from 'react';
import { render, screen } from '@testing-library/react';
import VIP from './VIP';

test('renders VIP screen', () => {
    render(<VIP />);
    const vipTitle = screen.getByText(/Welcome to the VIP!/i);
    expect(vipTitle).toBeInTheDocument();
    const vipImage = screen.getByAltText('VIP');
    expect(vipImage).toBeInTheDocument();
});
