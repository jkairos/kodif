import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TerminalHelp from '../TerminalHelp';

describe('TerminalHelp Component', () => {
    it('renders TerminalHelp component with initial state', () => {
        const { getByText } = render(<TerminalHelp />);

        // Check if the "Show Commands" button is rendered
        expect(getByText('Show Commands')).toBeInTheDocument();
    });
});
