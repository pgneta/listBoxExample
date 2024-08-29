import styled from 'styled-components';

// Grasshopper colors:
const DARK_BLUE = '#0f3294';
const SILVER = '#cccccc';
const LIGHT_BLUE = '#0fc8ef';
const TORY_BLUE = '#123dbc';
const BLUE_FOR_BUTTON = '#2075b6'
const HOVER_BLUE = '#123dbc';
const BUTTON_SHADOW_COLOR = '#ceecfe';
const BUTTON_SHADOW_COLOR2 = '#d0ecfee';
const HOVER_TEXT_COLOR = '#05a8ff';
// const HOVER_BLUE = '#4183be';

export const Header = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
    color: ${DARK_BLUE};
`;
export const Container = styled.div`
    padding: 10px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 50vh;
`;

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 40%;
    max-height: 50vh;
    overflow-y: scroll;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-top: 0;
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

export const SearchInput = styled.input`
    padding: 5px;
    width: 40%;
    border-radius: 10px;

`;


export const ButtonsContainer = styled.div``;
export const ShowButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({disabled}) => (disabled ? '#ccc' : BLUE_FOR_BUTTON)};
    color: #fff;
    padding: 8px 10px;
    border: none;
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 10px;
    font-weight: bold;
    ${({disabled}) =>
            !disabled && `
    box-shadow: ${BUTTON_SHADOW_COLOR} -1px 0px 4px 4px;
    `}
    
    &:hover {
        ${({disabled}) =>
                disabled ? '' : `
           background-color: WHITE;
           color: ${HOVER_TEXT_COLOR};
       
       `}
    }
`;
