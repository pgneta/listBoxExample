import styled from 'styled-components';

// Grasshopper colors:
const DARK_BLUE = '#0f3294';
const SILVER = '#cccccc';
const LIGHT_BLUE = '#0fc8ef';
const TORY_BLUE = '#123dbc';
const BLUE_FOR_BUTTON = '#2075b6'
const HOVER_BLUE = '#123dbc';
// const HOVER_BLUE = '#4183be';

export const Container = styled.div`
    padding: 10px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 50vh;
`;

// Style for the list of items
export const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 40%;
    max-height: 50vh; 
    overflow-y: scroll;
    border: 1px solid #ccc; 
    border-radius: 4px; 
`;

export const ListItem = styled.li`
    background-color: #fff;
    border-radius: 10px;

    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;

    &:nth-child(even) {
        background-color: #f2f2f2;
    }

    &:hover {
        background-color: ${TORY_BLUE};
        font-weight: bold;
        color: #fff;
    }

    &.selected {
        background-color: ${BLUE_FOR_BUTTON};
        color: #fff;
    }

    &.selected:hover {
        background-color: ${SILVER};
    }
`;

// Input for searching items
export const SearchInput = styled.input`
    margin-bottom: 10px;
    padding: 5px;
    width: 40%;
    border-radius: 10px;

`;

// Button for loading more items

export const ButtonsContainer = styled.div``;
export const ShowButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ disabled }) => (disabled ? '#ccc' : BLUE_FOR_BUTTON)};
    color: #fff;
    padding: 10px 15px;
    border: none;
    cursor:  ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 10px;

    &:hover {
        ${({ disabled }) => (disabled ? '' : `background-color: ${HOVER_BLUE};`)
       // background-color: ${HOVER_BLUE};
    }
`;
