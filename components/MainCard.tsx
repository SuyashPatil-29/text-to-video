import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { FileEditIcon, MoreHorizontalIcon, RepeatIcon } from 'lucide-react';
import { Generation } from '@prisma/client';

type VideoProps = {
  generation: Generation;
};

const MainCard = ({ generation }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsHovered(false);
  };

  return (
    <div className="relative flex flex-col gap-4 shrink-0 w-full">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-gray-300 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            width="456px"
            height="256px"
            loop
            autoPlay
            muted
            controls={isHovered} // Show controls only when hovered
            className='h-fit'
          >
            <source
              /* @ts-ignore */
              src={generation.videoUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="text-md mt-2 text-white font-medium truncate">
        {generation.inputPrompt}
      </div>
    </div>
  );
};

export default MainCard;
