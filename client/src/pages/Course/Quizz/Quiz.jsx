import React from 'react'
import {Quiz as QuizReact} from 'react-quiz-component';
import { quiz } from '../quiz';

const Quiz = () => {
  return (
    <>
        <h1>QUIZ</h1>
        <QuizReact quiz={quiz}/>
    </>
  )
}

export default Quiz