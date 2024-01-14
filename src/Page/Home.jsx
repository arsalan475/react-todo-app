import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
      <div className="relative min-h-screen">
    
  
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
  
        {/* Content */}
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Todo App</h1>
          <p className="text-lg mb-8">
            Organize your tasks, stay productive, and make your day more efficient with our Todo App.
          </p>
          <div className="flex justify-center">
          <Link to="/DemoApp">   <button
              className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition"
            >
             Get Started  
                    </button>
                    </Link>
          </div>
        </div>
      </div>
    );
  }
  
  
  


export default Home




