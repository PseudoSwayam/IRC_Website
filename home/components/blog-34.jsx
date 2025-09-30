"use client";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog34() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4 text-yellow-400">Latest Updates</p>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6 text-white">
              Innovation Insights
            </h2>
            <p className="text-medium text-gray-300">
              Stay updated with our latest projects, research breakthroughs, and robotics innovations.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          <div className="flex size-full flex-col items-start justify-start text-start">
            <a href="#" className="mb-6 w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
                className="aspect-[3/2] size-full rounded-image object-cover"
              />
            </a>
            <div className="mb-4 flex w-full items-center justify-start">
              <Badge className="mr-4">Category</Badge>
              <p className="text-small inline font-semibold">5 min read</p>
            </div>
            <a className="mb-2 flex justify-start text-start" href="#">
              <h2 className="heading-h5 font-bold text-white hover:text-yellow-400 transition-colors">
                Advanced AI Integration in Robotics
              </h2>
            </a>
            <p className="text-gray-300">
              Exploring the latest developments in AI-powered robotics and their real-world applications in automation.
            </p>
            <Button
              title="Read more"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-6 flex items-center justify-center gap-x-2"
            >
              Read more
            </Button>
          </div>
          <div className="flex size-full flex-col items-start justify-start text-start">
            <a href="#" className="mb-6 w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
                className="aspect-[3/2] size-full rounded-image object-cover"
              />
            </a>
            <div className="mb-4 flex w-full items-center justify-start">
              <Badge className="mr-4">Category</Badge>
              <p className="text-small inline font-semibold">5 min read</p>
            </div>
            <a className="mb-2 flex justify-start text-start" href="#">
              <h2 className="heading-h5 font-bold">
                Blog title heading will go here
              </h2>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros.
            </p>
            <Button
              title="Read more"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-6 flex items-center justify-center gap-x-2"
            >
              Read more
            </Button>
          </div>
          <div className="flex size-full flex-col items-start justify-start text-start">
            <a href="#" className="mb-6 w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
                className="aspect-[3/2] size-full rounded-image object-cover"
              />
            </a>
            <div className="mb-4 flex w-full items-center justify-start">
              <Badge className="mr-4">Category</Badge>
              <p className="text-small inline font-semibold">5 min read</p>
            </div>
            <a className="mb-2 flex justify-start text-start" href="#">
              <h2 className="heading-h5 font-bold">
                Blog title heading will go here
              </h2>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros.
            </p>
            <Button
              title="Read more"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-6 flex items-center justify-center gap-x-2"
            >
              Read more
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            title="View all"
            variant="secondary"
            className="mt-10 md:mt-14 lg:mt-16"
          >
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
