import React, { useEffect, useState } from "react"
import styled from "styled-components"
import lawn from "../img/lawner.png"

const Lawner = styled.div`
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: ${({posX}) => `${posX}px;`}
    left: ${({posY}) => `${posY}px;`}
    background-image: url(${lawn});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(${({dir}) => `${dir - 90}deg`});
`


const Player = ({x, y, dir}) => {

    return (
        <Lawner posX={x} posY={y} dir={dir} />
    )
}

export default Player