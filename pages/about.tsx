// pages/about.tsx
"use client";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold text-red-600">About Us</h1>
      <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-xl">
        This is the About page. Learn more about who we are and what we're all about.
      </p>
    </div>
  );
};

export default About;

