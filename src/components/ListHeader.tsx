import React from "react";
import {Header, Logo} from "./styled";
import logo from "./logo.png";


export const ListHeader:React.FC = () => {
    return( <Header>
        <Logo src={logo} alt='logo'/>MultiSelectListBoxDynamicSelector - Example
    </Header>
)
}