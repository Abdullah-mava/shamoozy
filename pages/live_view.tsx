// pages/liveview.tsx
"use client";
import React from "react";

const LiveView = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold text-red-600">Live View</h1>
      <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-xl">
        Welcome to the live view page! Here's where you can catch all the real-time action.
      </p>
      {/* Add content related to live view here */}
    </div>
  );
};

export default LiveView;

