import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function QuizCarditem({quiz, userSelectedOption}) {
    const [selectedOption, setSelectedOption] = useState();
  return quiz &&(
    <div className='mt-10 p-5 '>
      <h2 className='font-medium text-3xl text-center'>
        {quiz?.question}
        {/* {quiz?.options} */}
      </h2>
      <div className='grid grid-cols-2 gap-5 mt-6'>
        {quiz.options.map((option,index)=>(

        <h2 key={index} variant='outline'
        onClick={()=>{setSelectedOption(option)
            userSelectedOption(option)
        }}
        className={`w-full border rounded-full p-3 px-5 text-lg text-center 
        hover:bg-gray-200 cursor-pointer
        ${selectedOption==option &&'bg-primary text-white hover:bg-primary'}`}>{option}</h2>
        ))}
      </div>
    </div>
  )
}

export default QuizCarditem
