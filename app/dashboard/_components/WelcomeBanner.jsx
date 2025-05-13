"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user} = useUser();

  return (
    <div className='p-5 bg-primary w-full text-white rounded-lg flex items-center gap-6'>
      <Image src={'/laptop.png'} alt='laptop' width={100} height={100}/>
        <div>
            <h2 className='text-3xl font-bold'>Hello, {user?.fullName}</h2>
            {/* <h2 className='text-3xl font-bold'>{`${user.fullName}`}</h2> */}
            <p> Welcome Back, Let's learn and excel the interviews</p>
        </div>
    </div>

)
}

export default WelcomeBanner
