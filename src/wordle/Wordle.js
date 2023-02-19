import React from "react";
import './Wordle.css'

function WordleBoard(){

    const qtd_rows = 6    
    const qtd_columns = 5

    var crnt_row = 0

    return (
        <div
            className="wordle-board"
        >
            {[...Array(qtd_rows)].map((_, idx) => {

                let crtn_row_class = idx == crnt_row ? 'wordle-current-row ' : ''

                return(
                    <div className={"wordle-row " + crtn_row_class} key={idx}>
                        {[...Array(qtd_columns)].map((_, idx) => (
                            <div className="wordle-cell" key={idx}></div>
                        ))}
                    </div>
                )
            })}
        </div>
    );
  }


export default WordleBoard;

