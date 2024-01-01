// VideoComponent.js

import React from 'react';
import { Button } from './ui/button';
import { FileEditIcon, MoreHorizontalIcon, RepeatIcon } from 'lucide-react';

const MainCard = () => {
  return (
    <div className="relative flex flex-col gap-4 shrink-0 w-full">
      <div className="relative">
        <div className="bg-gray-300 rounded-lg overflow-hidden">
          <video className="w-auto h-full object-contain" preload="none" poster="https://cdn.pika.art/v1/d35b9576-9289-466d-835b-d614c0513c69/poster.jpg" loop playsInline>
            <source src="https://cdn.pika.art/v1/d35b9576-9289-466d-835b-d614c0513c69/A_cute_pika_in_Santa_hat_is_in_the_Christmas_gift_box,_looking_cute,_highlight_in_the_eyes,_joy_and__seed4606850785681271.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="text-md mt-2 text-white font-medium truncate">
        A cute pika in a Santa hat is in the Christmas gift box, looking cute, highlight in the eyes, joy and...
      </div>
    </div>
  );
};

export default MainCard;
