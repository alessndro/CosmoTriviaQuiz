import React from 'react'
import './App.css'
import Spline from '@splinetool/react-spline';



function Body(props){
    const questionEl = props.questions.map((item) => {
        const userChoices = item.answers.map((choice) => {
            return <div onDoubleClick={ () => props.handleClick(item.question, choice)} className={`answer-choice ${choice === item.selected ? 'selected' : ''}`}><p>{choice}</p></div>
        })

        return <div><p>{item.question}</p><div className="answer-row">{userChoices}</div></div>
    })

    
    return (
    <main>
        {!props.isStarted && <div className='introduction-content'>
            <div className='introduction-content-text'>
              <h1>Blast Off to Knowledge!</h1>
              <p>RocketQuiz is your ticket to an interstellar journey of learning and fun. Strap in and prepare to launch your mind into orbit with our exciting quiz game! Are you ready for liftoff?</p>
              <a href="#href-mode-section" className="btn btn-primary" >Start Quiz</a>
            </div>
            <div className='introduction-content-image'>
                <Spline id="spline" scene="https://prod.spline.design/MgF3bYG2lmUA3vWf/scene.splinecode" />
            </div>
        </div>}
        {props.isStarted && <div className="quiz-content">{questionEl}</div>}
        <div className="quiz-button-wrapper">
            {props.isStarted && props.isFinished ? <button className="btn btn-secondary" onClick={props.checkAnswers}>Check Answers</button>: ''}
            {props.isStarted && props.isFinished ? <button className="btn btn-secondary" onClick={props.restartGame}>Restart Game</button>: ''}
        </div>
        
    </main>
    )
}

export default Body