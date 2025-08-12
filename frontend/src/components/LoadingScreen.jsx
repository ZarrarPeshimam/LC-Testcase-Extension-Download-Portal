import React from 'react'

// LoadingScreen.jsx
export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p className="mt-4 text-lg">Starting server... Please wait</p>
    </div>
  );
}
