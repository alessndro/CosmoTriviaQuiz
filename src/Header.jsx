import React from 'react'

function Header(props){
    return (
        <nav >
            <h3>CosmoTrivia Blast</h3>
            {!props.isStarted ? <a href="#href-mode-section" className="btn btn-secondary">Start Quiz</a> : <button className="btn btn-secondary" onClick={props.handleRestart}>Exit Game</button> }
        </nav>
    )
}

export default Header