import React from "react";
import styled from "styled-components"
import lawn from '../img/lawn.jpg'

const Lawn = styled.div`
    display: inline-block;
    border-radius: 7px;
    flex-direction: column;
    width: 100%;
    background-image: url(${lawn});
    background-size: 300%;
    color: white;
    margin: 1px;
`

const Cell = ({index, status}) => {

    return (
        <Lawn></Lawn>
    )
}

export default Cell;