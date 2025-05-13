import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import Link from 'next/link';

function StudyMaterialSection({courseId,course}) {


    const [studyTypeContent,setstudyTypeContent]=useState();



    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Read Notes to prepare it',
            icon:'/notes.png',
            path:'/notes',
            type:'notes',
        },
        {
            name:'FlashCard',
            desc:'Easy way to memorize',
            icon:'/flashcard.png',
            path:'/flashcards',
            type:'flashcard',
        },
        {
            name:'Quiz',
            desc:'Want to test what you have prepared?',
            icon:'/quiz.png',
            path:'/quiz',
            type:'quiz',
        },
        // {
        //     name:'Question/Answer',
        //     desc:'Practice your learning',
        //     icon:'/qa.png',
        //     path:'/qa',
        //     type:'qa',
        // }
    ]

    useEffect(()=>{
        GetStudyMaterial();
    },[])

    const GetStudyMaterial=async ()=>{
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'ALL'
        })
        console.log(result?.data)
        setstudyTypeContent(result.data)
    } 
  return (
    <div className='mt-5'>
      <h2 className=" font-medium text-xl">Study Material</h2>
      
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-3 p-4'>
            {MaterialList.map((item,index)=>(
              
                <MaterialCardItem item={item} key={index}
                studyTypeContent={studyTypeContent}
                course={course}
                refreshData={GetStudyMaterial}
                />
           
            ))}
        </div>


    </div>
  )
}

export default StudyMaterialSection
