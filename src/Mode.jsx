import React from 'react'
import easy from './assets/easy-mode.png'
import medium from './assets/medium-mode.png'
import hard from './assets/hard-mode.png'
import checked from './assets/checked.png'
import question from './assets/question.png'

function Mode(props){

    let modeArrayEl = []

    if (!props.isStarted) 
    {modeArrayEl = props.modes.map( (arrayItem) => {

        return (
            <div onDoubleClick={() => props.handleClick(arrayItem.id)} key={arrayItem.id} className='select-mode'><img src={arrayItem.mode == 'easy' ? easy : arrayItem.mode == "medium" ? medium : hard}/><h3>{arrayItem.mode}</h3></div>
        )
    })}
    else {
        modeArrayEl = [<div className='select-mode'><img src={props.mode.mode == 'easy' ? easy : props.mode.mode == "medium" ? medium : hard}/><h5>Level: {props.mode.mode}</h5></div>, 
        <div className='select-mode'><img id="check-mark" src={checked} alt="3d check mark" /><h5>Correct Answers: {props.countCorrect}</h5></div>,
        <div className='select-mode'><img id="question-mark" src={question} alt="3d question mark" /><h5>Total Questions: {props.mode.amount_questions}</h5></div>
    ]
        
    }

    return (
        <div id="href-mode-section" className="mode-section"> 
         {!props.isStarted? <h2>Select your Level</h2> : <h2>Your Current Game</h2> } 
            <div className='mode-div'>
                {modeArrayEl}
            </div>
        </div>
    )
}

export default Mode