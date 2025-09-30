"use client";

import { Button } from "../../components/ui/button";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout239() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4 text-yellow-400">Our Expertise</p>
              <h2 className="heading-h2 mb-5 font-bold md:mb-6 text-white">
                Engineering Tomorrow's Technology Today
              </h2>
              <p className="text-medium text-gray-300">
                At ITER Robotics Club, we bridge the gap between imagination and innovation. Our multidisciplinary approach combines cutting-edge robotics, AI, and automation to create solutions that shape the future.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="rounded-image"
                />
              </div>
              <h3 className="heading-h4 mb-5 font-bold md:mb-6 text-white">
                Autonomous Robotics
              </h3>
              <p className="text-gray-300">
                Developing intelligent autonomous systems that can navigate, learn, and adapt to complex environments using advanced AI algorithms and sensor fusion technology.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="rounded-image"
                />
              </div>
              <h3 className="heading-h4 mb-5 font-bold md:mb-6 text-white">
                AI & Machine Learning
              </h3>
              <p className="text-gray-300">
                Implementing cutting-edge AI and ML algorithms to create intelligent systems that can learn, predict, and make decisions in real-time applications.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="rounded-image"
                />
              </div>
              <h3 className="heading-h4 mb-5 font-bold md:mb-6 text-white">
                Competition Excellence
              </h3>
              <p className="text-gray-300">
                Participating in national and international robotics competitions, consistently achieving top rankings through innovative design and teamwork.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary">Button</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Button
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
