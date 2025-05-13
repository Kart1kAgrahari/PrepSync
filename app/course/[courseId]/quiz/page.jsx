"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress';
import QuizCarditem from './_components/QuizCarditem';
import { SectionIcon } from 'lucide-react';

function Quiz() {
    const {courseId} = useParams();
    const [quizData, setQuizData]= useState();
    const [quiz,setQuiz]= useState([]);
    const [stepCount,setStepCount]=useState(0);
    const [isCorrectAns, setIsCorrectAns] = useState(null)
    const [correctAns,setCorrectAns]= useState();
    useEffect(()=>{
        GetQuiz()
    },[])
    const GetQuiz=async()=>{
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Quiz' // maybe Quiz

        })
        setQuizData(result.data);
        setQuiz(result.data?.content?.questions)
        // console.log(result) 
    }

    const checkAnswer=(userAnswer, currentQuestion)=>{
        if (userAnswer==currentQuestion.answer){
            setCorrectAns(currentQuestion.answer)
                setIsCorrectAns(true)
                return
        }
        setIsCorrectAns(false)
    }

    useEffect(()=>{
        setCorrectAns(null)
        setIsCorrectAns(null)
    },[stepCount])

  return (
    <div>
        <h2 className='font-bold text-2xl text-center mb-4'> QUIZ</h2>
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={(v)=>setStepCount(v)} />

        <div>
       
                <QuizCarditem quiz={quiz[stepCount]}  userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}/>
      
        </div>

        {isCorrectAns==false &&
        <div className=' border p-3 border-red-700 bg-red-200 rounded-lg'>
            <h2 className='font-bold text-lg text-red-600'>Incorrect Answer</h2>
            <p className='text-red-600'> Your answer is incorrect</p>
            <p className='text-green-600'> Correct Answer is: {correctAns}</p>
            
        </div>
        }
        {isCorrectAns==true &&
        <div className=' border p-3 border-green-700 bg-green-200 rounded-lg'>
            <h2 className='font-bold text-lg text-green-600'>Correct Answer</h2>
            <p className='text-green-600'> Your answer is correct</p>
            
        </div>
        }
        

    </div>
  )
}

export default Quiz
