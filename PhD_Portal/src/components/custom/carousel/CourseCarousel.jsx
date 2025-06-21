"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CourseCarousel = ({ courses }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full px-4"> 
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="scroll-px-4"> {/* Prevents edge clipping */}
          {courses.map((course, index) => {
            const isActive = activeIndex === index;

            return (
              <CarouselItem
                key={index}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className={`cursor-pointer transition-all duration-300 ease-in-out flex ${
                  isActive
                    ? "md:basis-[50%] sm:basis-[65%] basis-full scale-x-105"
                    : "md:basis-1/4 sm:basis-1/2 basis-full"
                }`}
              >
                <Card className="flex-grow bg-gray-100 shadow-sm h-40 transition-all duration-300">
                  <CardContent className="p-2 h-full flex flex-row items-start gap-4">  
                    {/* Left: Course Info */}
                    <div className="flex-grow">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.sem}</p>
                      <p className="text-sm text-gray-600">
                        Faculty - {course.faculty}
                      </p>
                      <p className="text-sm text-gray-600">
                        {course.credits} Credits
                      </p>
                    </div>

                    {/* Right: Schedule */}
                    {isActive && (
                      <div className="ml-auto w-[120px] text-xs text-gray-500 whitespace-pre-wrap bg-white p-2 rounded shadow-sm">
                        {course.schedule}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
