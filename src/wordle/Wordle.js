import React from "react"; 
import { useState, useEffect, useRef, useMemo} from "react";
import './Wordle.css'
import {IsLetter, MakeMatriz, Mod, RandomInteger} from '../suporte';

function getRandomWord(allWords){
    let idx = RandomInteger(0, allWords.length-1)
    return allWords[idx]
}

function WordleBoard({theme}){ 
    
    
    const [word, setWord] = useState(false)
    const [allWords, setAllWords] = useState([])

    useEffect(() => {
        /* Executa fetch dos dados */
        let url = '/Experimento-React/possible-words.txt'
        fetch(url)
        .then((resp) => resp.text())
        .then((txt) => {
            let allWordsAux = txt.split(',')
            setAllWords(allWordsAux)
            setWord(getRandomWord(allWordsAux))
        })
        .catch((error) => console.log(error))
    }, [])

    const qtdRows = 6    
    const qtdColumns = 5

    var crntRowIdx = useRef(0)

    const [selectedCell, setSelectedCell] = useState({row:crntRowIdx.current, col:0})
    const [charMatriz, setCharMatriz] = useState(MakeMatriz(qtdRows, qtdColumns, ' '))
    const [resultsMatriz, setResultsMatriz] = useState(MakeMatriz(qtdRows, qtdColumns, ' '))
    const [gameStatus, setGameStatus] = useState('running')

    function restartGame(){
        crntRowIdx.current = 0
        setWord(getRandomWord(allWords))
        setSelectedCell({row:crntRowIdx.current, col:0})
        setCharMatriz(MakeMatriz(qtdRows, qtdColumns, ' '))
        setResultsMatriz(MakeMatriz(qtdRows, qtdColumns, ' '))
        setGameStatus('running')
    }

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

        let full_word = charMatriz[crntRowIdx.current].join('')

        let correct_letters = []

        // Get corrects
        for(let i=0;i<qtdColumns;i++){
            if(word[i] === full_word[i]){ // Correct
                correct_letters.push(full_word[i])
            }
        }

        // Get missplaced and incorrects
        for(let i=0;i<qtdColumns;i++){
            if(word[i] === full_word[i]){
                resultsMatriz[crntRowIdx.current][i] = 'is-correct'
            } else if (word.includes(full_word[i]) && !correct_letters.includes(full_word[i]) ){ // Missplaced
                resultsMatriz[crntRowIdx.current][i] = 'is-missplaced'
                perfect = false
            } else { // Incorrect
                resultsMatriz[crntRowIdx.current][i] = 'is-incorrect'
                perfect = false
            }
        }
        return perfect
    }

    function checkWordExistance(){
        let inputed_word = charMatriz[crntRowIdx.current].join('')
        return allWords.includes(inputed_word)
    }

    function keyPress(e){
        var key = e.key
        if(gameStatus == 'running')
            if (e.code == 'Enter'){
                if(!checkAnyEmpty()){ // Checa se todas as cells estão preenchidas
                    if(checkWordExistance()){
                        let isPerfect = updateResults()
                        if (isPerfect){
                            setGameStatus('won')
                            setSelectedCell(false)
                        } else {
                            if(crntRowIdx.current < qtdRows-1){ // Checa se não é a ultima row
                                crntRowIdx.current += 1
                                setSelectedCell({row: crntRowIdx.current, col: 0})
                            } else {
                                setSelectedCell(false)
                                if(!isPerfect){
                                    setGameStatus('lost')
                                    console.log("A palavra era: "+word)
                                }
                            }
                        }
                    } else {
                        console.log("A palavra entrada não existe!")
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
            className={"wordle-board " + theme}
        >
            {gameStatus == 'won' ?
                <div
                className={'wordle-endscreen '+theme}
                onClick={restartGame}
            >
                <div style={{textAlign: 'center'}}>
                    <a style={{fontSize:'40px'}}>{"Jogar novamente"}</a>
                </div>
            </div>
            :gameStatus == 'lost' &&
                <div
                    className={'wordle-endscreen '+theme}
                    onClick={restartGame}
                >
                    <div style={{textAlign: 'center'}}>
                        <a style={{fontSize:'40px'}}>{"A palavra era\n"}</a>
                        <a style={{fontSize:'50px'}}>{word}</a>
                    </div>
                </div>
            }
            {[...Array(qtdRows)].map((_, idx) => {
                if(word){
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
                                        theme={theme}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    )
                }
            })}
        </div>
    );
}

function WordleCell({gameStatus, char, status, row, col, isSelectable, selectedCell, setSelectedCell, theme}){

    var isSelected = selectedCell.row == row && selectedCell.col == col
    var className = 'wordle-cell '
    className += isSelected ? 'is-selected' : ''
    className += status + ' '
    className += theme + ' '
    
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


