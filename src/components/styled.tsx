import styled from 'styled-components';

// Grasshopper Blue colors:
const DARK_BLUE = '#0f3294';
const SILVER = '#cccccc';
const TORY_BLUE = '#123dbc';
const BLUE_FOR_BUTTON = '#2075b6'
const BUTTON_SHADOW_COLOR = '#ceecfe';
const HOVER_TEXT_COLOR = '#05a8ff';

export const Header = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    color: ${DARK_BLUE};
`;

export const Logo = styled.img`
    height: 40px;
    margin-right: 10px;`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    min-height: 50vh;
    width: 40rem;
    margin: 0 auto;
    align-items: flex-start; 
    justify-content: flex-start;
`;

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 100%;
    max-height: 50vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    margin-top: 0;
    height: 400px; 
    overflow-y: auto; 
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
    width: 100%;
    border-radius: 10px;

`;


export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%; 
    margin-top: 10px; 
    flex-direction: row;
    `

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
    width: 45%;
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
