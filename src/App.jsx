import { useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Mode from './Mode.jsx'
import Body from './Body.jsx'
import React from 'react'
import he from 'he'
import Footer from './Footer.jsx'


function App() {
  const [countCorrect, setCountCorrect] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const [mode, setMode] = useState({})
  const [isFinished, setIsfinished] = useState(false)
  const [questions, setQuestions] = useState([])

  // Initialise array with different modes and their features
  const modeArray = [
    {
      id: "1",
      mode: "easy",
      time: 600,
      amount_questions: 5,
    },
    {
      id: "2",
      mode: "medium",
      time: 300,
      amount_questions: 10
    },
    {
      id: "3",
      mode: "hard",
      time: 180,
      amount_questions: 15
    }
  ]
  
  function restartGame() {

    setQuestions([])
    setIsfinished(false)
    setIsStarted(false)
    setMode({})
    setCountCorrect("")
  }

  function checkAnswers(){
      let goodCount = 0
      const totalCount = questions.length
          // Check for incorrect answers
      questions.forEach((item) =>
      {
          item.selected === item.correct ? goodCount = goodCount + 1 : goodCount = goodCount + 0 
      })
      setCountCorrect(`${goodCount} / ${totalCount}`)
  }

  function selectAnswer(question, answer)
  {
    

    setQuestions(prevQuestions => {
      return prevQuestions.map((item) => {
        if (item.question === question)
        {
          return {
            ...item,
            selected: answer
          }
        }
        else {
          return item
        }
      })
    })

  }

  // Initialize question array using Trivia API
  React.useEffect( () => {
  
     
      let level = mode.mode
      let amount_questions = mode.amount_questions
  
      fetch(`https://opentdb.com/api.php?amount=${{amount_questions}}&difficulty=${level}&type=multiple`)
        .then(response => response.json())
        .then(data => { 
          
            let tempArray = []
            for(let i=0; i < amount_questions; i++)
            {
              // create array of answers, currently only the incorrect options
              let answers = data.results[i].incorrect_answers
              
              // create random index to place correct answers between incorrect
              let correctIndex = Math.floor(Math.random() * 4)
              // store the value at random index
              const tempValue = data.results[i].incorrect_answers[correctIndex]
              
              // replace the item at random index with correct answer
              answers[correctIndex] = data.results[i].correct_answer

              // push the old value at random index to end of list
              answers.push(tempValue)
              
              let decodedAnswers = answers
                  .filter((item) => item !== undefined) // Filter out undefined values
                  .map((item) => he.decode(item));
    
         
              tempArray.push({
                question: he.decode(data.results[i].question),
                answers: decodedAnswers,
                correct: data.results[i].correct_answer,
                selected: null,
                correctIndex: correctIndex,
              })
            }
            setQuestions(tempArray)            
        
        })

  }, [isStarted])


  // With every change of Questions, check whether users' answers
  React.useEffect( () => {
    // let falseCount = 0
    let notSelectCount = 0

    

    // Check for unselected answers
    questions.forEach((item) =>
    {
        item.selected === null ? notSelectCount = notSelectCount + 1 : notSelectCount = notSelectCount + 0 
    })

    notSelectCount > 0 ? setIsfinished(false) : setIsfinished(true)
    
  }, [questions])


  function startGame(id) {
    let currentMode = modeArray.filter((item) => {
      return item.id === id
    })

    setMode(currentMode[0])
    setIsStarted(true)
  }

  return (
    <div className="root-div">
      <div className="main-div">
        <Header handleRestart={restartGame} isStarted={isStarted}/>
        <Body  questions={questions} checkAnswers={checkAnswers} restartGame={restartGame} handleClick={selectAnswer} isStarted={isStarted} isFinished={isFinished}/>
      </div>
      <Mode countCorrect={countCorrect} isStarted={isStarted} mode={mode} modes={modeArray} handleClick={startGame}/>
      <Footer />
    </div>

  )
}

export default App
{/* <Spline id="spline" scene="https://prod.spline.design/yPMIENyH-ZZMJxAg/scene.splinecode" /> */}