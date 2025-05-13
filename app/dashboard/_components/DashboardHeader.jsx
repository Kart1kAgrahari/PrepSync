"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

function DashboardHeader() {
    const router = useRouter();
  return (
    
    <div className= 'p-2 shadow-md flex justify-between height-40'>
       <div className="flex gap-2 items-center">
              <Image src={"/logo.svg"} alt="logo image" width={30} height={30} />
              <h2 className="font-bold text-2xl">PrepSync</h2>
      </div>
      
        <UserButton />
        
    </div>
  )
}

export default DashboardHeader
