"use client"
import { Sparkle } from "lucide-react";
import { Press_Start_2P } from "next/font/google";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";
import { Button } from "./ui/button";

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className=" bg-[rgb(18,18,18)] w-screen h-[150px] fixed bottom-0 border-t-[1px] border-muted-foreground">
    <div className="fixed bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                autoFocus
                className="resize-none pr-12 text-xl rounded-xl text-justify text-white bg-[rgb(34,34,34)] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-1"
                placeholder="Describe your story"
                rows={1}
                maxRows={1}
                minRows={1}
                spellCheck
                />
              <Button
                className="absolute bottom-[4px] right-[8px] px-0 py-0"
                aria-label="send message"
                >
                <Sparkle className="h-8 w-8 rounded-lg  bg-[rgb(255,237,210)] text-black" fill="black" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
                  </div>
  );
};

export default ChatInput;
