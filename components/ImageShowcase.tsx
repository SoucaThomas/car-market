'use client';

import { Upload } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageShowcaseProps {
  images: Upload[];
}

export function ImageShowcase(props: ImageShowcaseProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className="flex h-3/4 w-full flex-row gap-4 rounded-lg border">
      <div className="relative m-auto w-full rounded-lg backdrop-brightness-90">
        <Image
          className="aspect-video h-full w-full rounded-lg object-contain"
          src={props.images[currentImageIndex].ufsUrl}
          alt={props.images[currentImageIndex].name}
          width={600}
          height={600}
        />
        <Button
          variant="outline"
          className="absolute left-4 top-1/2 aspect-square"
          onClick={() =>
            setCurrentImageIndex((prev) => (prev - 1 + props.images.length) % props.images.length)
          }
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          className="absolute right-4 top-1/2 aspect-square"
          onClick={() =>
            setCurrentImageIndex((prev) => (prev + 1 + props.images.length) % props.images.length)
          }
        >
          <ChevronRight size={24} />
        </Button>
      </div>
      <div className="w-1/4 overflow-y-auto rounded-lg">
        <div className="flex h-full flex-col gap-4 overflow-hidden p-4">
          {props.images.map((image, index) => (
            <div
              key={index}
              className={clsx('h-1/4 w-full', {
                'border-4': index === currentImageIndex,
              })}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                className="h-full w-full object-contain"
                src={image.ufsUrl}
                alt={image.name}
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
