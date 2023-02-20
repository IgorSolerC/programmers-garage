import React from "react"; 
import { useState, useEffect, useRef} from "react";
import './Wordle.css'
import {IsLetter, MakeMatriz, Mod} from '../suporte';

function WordleBoard(){

    var word = 'TESTE'

    const qtdRows = 6    
    const qtdColumns = 5

    var crntRowIdx = useRef(0)

    const [selectedCell, setSelectedCell] = useState({row:crntRowIdx.current, col:0})
    const [charMatriz, setCharMatriz] = useState(MakeMatriz(qtdRows, qtdColumns, ' '))
    const [resultsMatriz, setResultsMatriz] = useState(MakeMatriz(qtdRows, qtdColumns, ' '))
    const [gameStatus, setGameStatus] = useState('running')

    function checkAnyEmpty(){
        let crntRow = charMatriz[crntRowIdx.current]
        return !crntRow.every((el) => IsLetter(el))
    }

    function findNextEmptyCell(){
        if(checkAnyEmpty()){
            let i=1
            let fount_empty = false
            let selectedColIdx = selectedCell.col
            let crntRow = charMatriz[crntRowIdx.current]
            while (!fount_empty){
                let crntColIdx = (selectedColIdx + i) % qtdColumns
                if(!IsLetter(crntRow[crntColIdx]))
                    return {row:crntRowIdx.current, col:crntColIdx}
                i++
            }
        } else return false
       
    }

    function findPreviousCell(loop=true){
        if(selectedCell){
            let selectedColIdx = selectedCell.col
            let crntColIdx
            if(loop){
                crntColIdx = Mod((selectedColIdx - 1),qtdColumns)
            } else {
                crntColIdx = selectedColIdx - 1
                if(crntColIdx <= 0){
                    return false
                }
            }
            return {row:crntRowIdx.current, col:crntColIdx}
   
        } else {
            return {row:crntRowIdx.current, col:qtdColumns-1}
        }
    }

    function findNextCell(loop=true){
        if(selectedCell){
            let selectedColIdx = selectedCell.col
            let crntColIdx
            if(loop){
                crntColIdx = (selectedColIdx + 1) % qtdColumns
            } else {
                crntColIdx = selectedColIdx + 1
                if(crntColIdx >= qtdColumns){
                    return false
                }
            }
            return {row:crntRowIdx.current, col:crntColIdx}
   
        } else {
            return {row:crntRowIdx.current, col:0}
        }
    }

    function writeChar(char, pos=null){
        let row
        let col
        if(pos == null){
            row = selectedCell.row
            col = selectedCell.col
        } else {
            row = pos.row
            col = pos.col
        }
        charMatriz[row][col] = char
        setCharMatriz([...charMatriz])
    }

    function deleteChar(how){
        if(selectedCell){
            let selectedChar = charMatriz[selectedCell.row][selectedCell.col]
            if(selectedChar == ' '){
                let pos;
                if(how == 'Backspace'){
                    pos = findPreviousCell(false)
                }
                else if(how == 'Delete'){
                    pos = findNextCell(false)
                }
                if(pos){
                    setSelectedCell(pos)
                    writeChar(' ', pos)
                } else{
                    if(how == 'Backspace'){
                        setSelectedCell({row:crntRowIdx.current, col:0})
                    }
                    else if(how == 'Delete'){
                        setSelectedCell({row:crntRowIdx.current, col:qtdColumns-1})
                    }
                }
            } else {
                writeChar(' ')
            }
        } else {
            let pos;
            if(how == 'Backspace'){
                pos = {row:crntRowIdx.current, col:qtdColumns-1}
            }
            else if(how == 'Delete'){
                pos = {row:crntRowIdx.current, col:0}
            }
            setSelectedCell(pos)
            writeChar(' ', pos)
        }
    }

    function updateResults(){
        let perfect = true
        for(let i=0;i<qtdColumns;i++){
            if(word[i] === charMatriz[crntRowIdx.current][i]){ // Correct
                resultsMatriz[crntRowIdx.current][i] = 'is-correct'
            } else if (word.includes(charMatriz[crntRowIdx.current][i])){ // Missplaced
                resultsMatriz[crntRowIdx.current][i] = 'is-missplaced'
                perfect = false
            } else {
                resultsMatriz[crntRowIdx.current][i] = 'is-incorrect'
                perfect = false
            }
        }
        return perfect
    }

    function keyPress(e){
        var key = e.key
        if(gameStatus == 'running')
            if (e.code == 'Enter'){
                let isPerfect = updateResults()
                if (isPerfect){
                    setGameStatus('won')
                    setSelectedCell(false)
                } else {
                    if(!checkAnyEmpty()){ // Checa se todas as cells estão preenchidas
                        if(crntRowIdx.current < qtdRows-1){ // Checa se não é a ultima row
                            crntRowIdx.current += 1
                            setSelectedCell({row: crntRowIdx.current, col: 0})
                        } else {
                            setSelectedCell(false)
                            if(!isPerfect){
                                setGameStatus('lost')
                            }
                        }
                    }
                }
            } else if (e.code == 'Space'){
                setSelectedCell(findNextEmptyCell)
            } else if (e.code == 'ArrowRight'){
                setSelectedCell(findNextCell)
            } else if (e.code == 'ArrowLeft'){
                setSelectedCell(findPreviousCell)
            } else if (e.code == 'Backspace'){
                deleteChar("Backspace")
            } else if (e.code == 'Delete'){
                deleteChar("Delete")
            } else if (selectedCell){
                key = key.toUpperCase()
                if(IsLetter(key)){
                    writeChar(key)
                    setSelectedCell(findNextEmptyCell)
                }
            }
    }

    useEffect(() => {
        window.addEventListener("keyup", keyPress)
        return(() => window.removeEventListener("keyup", keyPress))
    })

    return (
        <div
            className="wordle-board"
        >
            {[...Array(qtdRows)].map((_, idx) => {

                let isCrntRow = idx == crntRowIdx.current
                let crtnRowClass = isCrntRow ? 'wordle-current-row ' : ''

                return(
                    <div className={"wordle-row " + crtnRowClass} key={idx}>
                        {[...Array(qtdColumns)].map((_, cell_idx) => (
                            <React.Fragment key={cell_idx}>                                
                                <WordleCell
                                    gameStatus={gameStatus}
                                    char={charMatriz[idx][cell_idx]}
                                    status={resultsMatriz[idx][cell_idx]}
                                    selectedCell={selectedCell}
                                    setSelectedCell={setSelectedCell}
                                    row={idx}
                                    col={cell_idx}
                                    isSelectable={isCrntRow}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                )
            })}
        </div>
    );
}

function WordleCell({gameStatus, char, status, row, col, isSelectable, selectedCell, setSelectedCell}){

    var isSelected = selectedCell.row == row && selectedCell.col == col
    var className = 'wordle-cell '
    className += isSelected ? 'is-selected' : ''
    className += status
    
    return (
        <div 
            onClick={
                () => {
                    if(isSelectable && gameStatus == 'running'){ // Se é possível digitar nesta row
                        setSelectedCell({row, col})
                    }
                }
            }
            className={className}
        >
            <span className="wordle-cell-char">{char}</span>
        </div>
    )
}

export default WordleBoard;


