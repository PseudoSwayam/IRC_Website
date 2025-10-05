"use client";

import React from 'react';

const TestTimeline = () => {
  return (
    <section className="py-16 px-4 bg-red-500">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          TEST TIMELINE - This should be visible
        </h2>
        <div className="bg-yellow-400 p-8 text-black">
          <p>If you can see this, the Timeline component is loading</p>
        </div>
      </div>
    </section>
  );
};

export default TestTimeline;