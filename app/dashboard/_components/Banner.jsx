import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <section className="bg-white text-center py-16 px-6">
      {/* Top badge */}
      {/* <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          New
        </span>
        <span className="ml-2 text-sm text-gray-600 font-medium">
          Tubeguruji.com All new Apps
        </span>
      </div> */}

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Prep<span className="text-blue-600">Sync</span><br />
     
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 text-lg mb-8">
       An AI powered LMS and Mock Interview Platform
      </p>

      {/* Buttons */}
      <div className="flex justify-center space-x-4">
        <Link href={'/dashboard'} className="w-full">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Get Started →
        </button>
        </Link>
        
      </div>

      {/* Optional Featured section */}
      <p className="mt-12 text-sm text-gray-400 uppercase tracking-widest">

      </p>


       {/* Features Section */}
       <h2 className='mt-20 text-bold text-3xl mb-5'>Features</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-left text-gray-700">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-blue-600 mb-2">Smart LMS</h3>
          <p>Personalized learning paths powered by AI to help students at every level stay on track.</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-blue-600 mb-2">Mock Interviews</h3>
          <p>Practice real-world interviews with instant AI feedback and scoring.</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-blue-600 mb-2">Progress Tracking</h3>
          <p>Visual dashboards to monitor your prep journey.</p>
        </div>
      </div>
    </section>
    
  );
};

export default Banner;
