"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/flashcardItem';
import { ApiError } from 'next/dist/server/api-utils';

function Flashcards() {

    const {courseId} = useParams();
    const [flashCards,setflashCards] = useState([]);
    const [isFlipped,setIsFlipped] = useState();
    const [api,setApi] = useState();


    useEffect(()=>{
        GetFlashCards();
    },[])

    useEffect(()=>{
      if(!api){
        return;
      }
      api.on('select',()=>{
        setIsFlipped(false)
      })
    },[api])

    const GetFlashCards=async()=>{
        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'FlashCard'
        })
        setflashCards(result?.data)
        console.log('FlashCard', result?.data)
    }
    const handleClick=()=>{
        setIsFlipped(!isFlipped)
    }
        
  return (  
    <div>
      <h2 className='font-bold text-2xl'>FLASHCARDS</h2>
      <p>Helps you to rememeber easily </p>


      <div className=' mt-10'>
        <Carousel setApi={setApi}>
  <CarouselContent>
    {flashCards?.content&&flashCards?.content?.map((flashcard,index)=>(

    <CarouselItem key={index} className='flex items-center justify-center'> 
      <FlashcardItem handleClick={handleClick} isFlipped={isFlipped}
      flashcard={flashcard}/>
    </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

       
      </div>

    </div>
  )
}

export default Flashcards
