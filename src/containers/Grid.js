import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Cell from "../components/Cell"
import Player from "../components/Player"
import txt from '../data.txt'

const GridContainer = styled.div`
    width: 800px;
    height: 600px;
    position: relative;
    display: block;
`

const Line = styled.div`
    height: 100px;
    display: flex;
    justify-content: space-around;
    margin: 0px;
`
const InfoContainer = styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 7px;
`
const Info = styled.div`
    font-size: 20px;
`
const Grid = () => {

    const [position, setPosition] = useState({mower1: {x: 0, y: 0}, mower2: {x: 0, y: 0}})
    const [direction, setDirection] = useState({mower1: "", mower2: ""})
    const [instructions, setInstructions] = useState({mower1: "", mower2: ""})
    const [rotation, setRotation] = useState({mower1: 90, mower2: -90})
    const [index, setIndex] = useState(0)
    const [isDone, setIsDone] = useState({mower1: false, mower2: false})

    const offsetX = 8;
    const offsetY = 35;

    // Fetching data from ../data.txt
    useEffect(() => {
        fetch(txt).then(txt => txt.text()).then(txt => {
           let data = (txt.split("\r"))

           setPosition({
            mower1: {
                x: parseInt(data[1].split(" ")[0].charAt(1)),
                y: parseInt(data[1].split(" ")[0].charAt(2))
            },
            mower2: {
                x: parseInt(data[3].split(" ")[0].charAt(1)),
                y: parseInt(data[3].split(" ")[0].charAt(2))
            }})

           setDirection({mower1: data[1].split(" ")[1], mower2: data[3].split(" ")[1]})
           setInstructions({mower1: data[2].split('\n')[1], mower2: data[4].split('\n')[1]})

        })
        
    }, [])
    
    // split data instructions then call nextMove() for data processing.
    useEffect(() => {
        let splitted

        if (!isDone.mower1) {
            splitted = instructions.mower1.split("")
        } else {
            splitted = instructions.mower2.split("")
        }

        if (index < splitted.length) {
            setTimeout(() => {
                NextMove(splitted[index])
                setIndex(index + 1)
            }, 500);
        } else if (isDone.mower1 && !isDone.mower2) {
            setIndex(0)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps

    },[instructions, index, isDone])


    const matrix = [
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5]
    ]

    const MatrixToDisplay = (matrix) => {
        return (
            <div>{matrix.map((item => {
                return <Line key={Math.random()}>{item.map(it => <Cell key={Math.random()} index={it}/>)}</Line>
            }))}</div>
        )
    }

    const orientation = ["N","E","S","W"]

    const NextMove = (instruction) => {

        if (index === instructions.mower1.length - 1) {
            setIsDone({mower1: true, mower2: false})
        }
        if (index === instructions.mower2.length - 1 && isDone.mower1) {
            setIsDone({mower1: true, mower2: true})
        }

        // check if the next move will be inside the grid then go forward by checking mower direction
        if (instruction === "F") {
            switch(isDone.mower1 ? direction.mower2 : direction.mower1) {
                case 'N':
                    if (!isDone.mower1) {
                        if (position.mower1.x + 1 >= 6) return
                        setPosition({mower1:{x:position.mower1.x + 1, y:position.mower1.y}, mower2: {x:position.mower2.x, y: position.mower2.y}})
                    } else {
                        if (position.mower2.x + 1 >= 6) return
                        setPosition({mower1:{x:position.mower1.x, y:position.mower1.y}, mower2: {x:position.mower2.x + 1, y: position.mower2.y}})
                    }
                    break
                case 'E':
                    if (!isDone.mower1) {
                        if (position.mower1.y + 1 >= 6) return
                        setPosition({mower1:{x:position.mower1.x, y:position.mower1.y + 1}, mower2: {x:position.mower2.x, y: position.mower2.y}})
                    } else {
                        if (position.mower2.y + 1 >= 6) return
                        setPosition({mower1:{x:position.mower1.x, y:position.mower1.y}, mower2: {x:position.mower2.x, y: position.mower2.y + 1}})
                    }
                    break
                case 'S':
                    if (!isDone.mower1) {
                        if (position.mower1.x - 1 <= 0) return
                        setPosition({mower1:{x:position.mower1.x - 1, y:position.mower1.y}, mower2: {x:position.mower2.x, y: position.mower2.y}})
                    } else {
                        if (position.mower2.x - 1 <= 0) return
                        setPosition({mower1:{x:position.mower1.x, y:position.mower1.y}, mower2: {x:position.mower2.x - 1, y: position.mower2.y}})
                    }
                    break
                case 'W':
                    if (!isDone.mower1) {
                        if (position.mower1.y - 1 <= 0) return
                        setPosition({mower1:{x:position.mower1.x, y:position.mower1.y - 1}, mower2: {x:position.mower2.x, y: position.mower2.y}})
                    } else {
                        if (position.mower2.y - 1 <= 0) return
                        setPosition({mower1:{x:position.mower1.x, y:position.mower1.y}, mower2: {x:position.mower2.x, y: position.mower2.y - 1}})
                    }
                    break
                default: break
            }
        } else if (instruction !== undefined) { // Mower rotation
            if (instruction === 'L') {
                if (!isDone.mower1) {
                    setDirection({mower1: orientation[orientation.indexOf(direction.mower1) - 1], mower2: direction.mower2})
                    setRotation({mower1: rotation.mower1 - 90, mower2: rotation.mower2})
                } else {
                    setDirection({mower1: direction.mower1, mower2: orientation[orientation.indexOf(direction.mower2) - 1]})
                    setRotation({mower1: rotation.mower1, mower2: rotation.mower2 - 90})
                }
            } else {
                if (!isDone.mower1) {
                    console.log(orientation[orientation.indexOf(direction.mower1)])

                    setDirection({mower1: orientation[orientation.indexOf(direction.mower1) + 1], mower2: direction.mower2})
                    setRotation({mower1: rotation.mower1 + 90, mower2: rotation.mower2})
                } else {
                    setDirection({mower1: direction.mower1, mower2: orientation[orientation.indexOf(direction.mower2) + 1]})
                    setRotation({mower1: rotation.mower1, mower2: rotation.mower2 + 90})
                }
            }
        }
    }

    return (
        <>
            <GridContainer>
                {MatrixToDisplay(matrix)}
                <Player x={(position.mower1.x * 100.16) + offsetX} y={(position.mower1.y * 133) + offsetY} dir={rotation.mower1} />
                <Player x={(position.mower2.x * 100.16) + offsetX} y={(position.mower2.y * 133) + offsetY} dir={rotation.mower2} />
                <InfoContainer>
                    <Info>mower 1</Info>
                    <Info style={isDone.mower1 ? {'color' : 'red'} : null}>position: X = {position.mower1.x}  Y = {position.mower1.y}</Info>
                    <Info>direction: {direction.mower1}</Info>
                    <Info>Instructions: {instructions.mower1}</Info>
                    <Info>------------------------------------------------------------</Info>
                    <Info>mower 2</Info>
                    <Info style={isDone.mower2 ? {'color' : 'red'} : null}>position:  X = {position.mower2.x}  Y = {position.mower2.y}</Info>
                    <Info>direction: {direction.mower2}</Info>
                    <Info>Instructions: {instructions.mower2}</Info>
                </InfoContainer>
            </GridContainer>
        </>
    )
}

export default Grid