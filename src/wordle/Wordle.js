import React from "react";
import { useState } from "react";
import './Wordle.css'

function WordleBoard(){

    const qtdRows = 6    
    const qtdColumns = 5

    var crntRow = 0

    const [selectedCell, setSelectedCell] = useState(false)

    return (
        <div
            className="wordle-board"
        >
            {[...Array(qtdRows)].map((_, idx) => {

                let isCrntRow = idx == crntRow
                let crtnRowClass = isCrntRow ? 'wordle-current-row ' : ''

                return(
                    <div className={"wordle-row " + crtnRowClass} key={idx}>
                        {[...Array(qtdColumns)].map((_, cell_idx) => (
                            <WordleCell
                                selectedCell={selectedCell}
                                setSelectedCell={setSelectedCell}
                                row={idx}
                                col={cell_idx}
                                isSelectable={isCrntRow}
                                key={idx + '-' + cell_idx}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    );
}

function WordleCell({key, row, col, isSelectable, selectedCell, setSelectedCell}){

    var isSelected = selectedCell.row == row && selectedCell.col == col
    var selectedClass = isSelected ? 'is-selected ' : ''

    return (
        <div 
            onClick={
                () => {
                    if(isSelectable){ // Se é possível digitar nesta row
                        // Logica de seleção
                        if(isSelected){
                            setSelectedCell(false)
                        } else {                     
                            setSelectedCell({row, col})
                        }
                    }
                }
            }
            className={"wordle-cell " + selectedClass}
            key={key}
        >

        </div>
    )
}

export default WordleBoard;


