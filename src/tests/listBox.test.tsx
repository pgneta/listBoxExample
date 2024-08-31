import React from 'react';
import {ExampleMultiSelectListBoxDynamicSelector} from "../components/ExampleMultiSelectListBoxDynamicSelector";
import {mockGetItemsById, mockSearchItems} from "../mock/mockUtils";
import {render} from "@testing-library/react"; // Mock functions
import {fireEvent, screen, waitFor} from "@testing-library/dom";

describe('MultiSelectListBox Component', () => {

    jest.setTimeout(10000);


    it('renders and displays items based on search', async () => {
        render(
            <ExampleMultiSelectListBoxDynamicSelector
                initialSelectedIds={['0']}
                searchFunction={mockSearchItems}
                getItemsById={mockGetItemsById}
                pageSize={10}
            />
        );

        // Trigger search input change
        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: 'Item Name 123' },
        });

        // Wait for items to appear
        await waitFor(() => {
            expect(screen.getByText(/^Item Name 123$/).textContent).toBe('Item Name 123');
        }, { timeout: 6000 });
    });

    it('handles item selection correctly', async () => {
        render(
            <ExampleMultiSelectListBoxDynamicSelector
                initialSelectedIds={['0']}
                searchFunction={mockSearchItems}
                getItemsById={mockGetItemsById}
                pageSize={5}
            />
        );

        // Wait for items to appear
        await waitFor(() => {
            expect(screen.getByText('Item Name 2').textContent).toBe('Item Name 2');
        }, { timeout: 6000 });

        // Simulate item click
        fireEvent.click(screen.getByText(/^Item Name 2$/));

        // Check if item is selected
        expect(screen.getByText(/^Item Name 2$/)).toHaveClass('selected');
    });

    it('shows loading indicator during data fetch', async () => {
        render(
            <ExampleMultiSelectListBoxDynamicSelector
                initialSelectedIds={['0']}
                searchFunction={mockSearchItems}
                getItemsById={mockGetItemsById}
                pageSize={10}
            />
        );

        // Trigger search input change
        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: 'Item Name 300' },
        });

        // Check for loading indicator
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for items to appear
        await waitFor(() => {
            expect(screen.getByText(/Item Name 300/i)).toHaveTextContent('Item Name 300');
        }, { timeout: 6000 });

        // Ensure loading indicator is gone
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });


    it('no initial ids provided', async () => {
        render(
            <ExampleMultiSelectListBoxDynamicSelector
                searchFunction={mockSearchItems}
                getItemsById={mockGetItemsById}
                pageSize={5}
            />
        );

        // Check if item is found - list is shown
        await waitFor(() => {
            expect(screen.getByText(/^Item Name 3$/)).toBeInTheDocument();
        }, { timeout: 6000 });

    });

});
