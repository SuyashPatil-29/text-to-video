"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Sparkle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import {Visibility} from "@prisma/client"


const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

const ChatInput = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const { toast } = useToast();

  const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
    public: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      public: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values.public === true ? Visibility.PUBLIC : Visibility.PRIVATE);
      if (!values.prompt.trim()) {
        toast({
          title: "Error",
          description: "Textbox cannot be empty",
          variant: "destructive",
        });
        console.log(values.prompt);
        return;
      }
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: values.prompt,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.detail);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.detail,
        });
        return;
      }

      let prediction = await response.json();
      setPrediction(prediction);

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const statusResponse = await fetch("/api/predictions/" + prediction.id);

        if (!statusResponse.ok) {
          const error = await statusResponse.json();
          setError(error.detail);
          return;
        }

        prediction = await statusResponse.json();
        setPrediction(prediction);
      }

      const data = {
        prompt: values.prompt,
        userId: session?.user.id,
        videoUrl: prediction.output,
        status: prediction.status,
        id: prediction.id,
        visibility: values.public === true ? Visibility.PUBLIC : Visibility.PRIVATE,
      };

      const libraryResponse = await axios.post("/api/my-library", data);

      if (libraryResponse.status === 200) {
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log({ prediction });

  return (
    <div className=" bg-[rgb(18,18,18)] w-screen h-[150px] fixed bottom-0 border-t-[1px] border-muted-foreground">
      <div className="fixed bottom-0 left-0 w-full">
        <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="relative flex flex-col w-full flex-grow p-4">
              <div className="relative">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 flex items-center jus"
                  >
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              autoFocus
                              className={cn(
                                "resize-none pr-12 text-xl rounded-xl text-justify text-white bg-[rgb(34,34,34)] flex-1",
                                form.formState.errors["prompt"]
                                  ? "focus:ring-offset-red-500 focus:ring-offset border-red-500"
                                  : "border-input"
                              )}
                              placeholder="Describe your story"
                              rows={1}
                              maxRows={3}
                              minRows={1}
                              spellCheck
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="public"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Make this video public
                            </FormLabel>
                            <FormDescription>
                              Public videos can be seen by everyone in the
                              <Link href="/examples/forms" className="text-yellow-400">
                                Explore
                              </Link>{" "}
                              page.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      className={cn(
                        "absolute bottom-[4px] right-[8px] px-0 py-0"
                      )}
                      aria-label="send message"
                      type="submit"
                    >
                      <Sparkle
                        className="h-8 w-8 rounded-lg  bg-[rgb(255,237,210)] text-black"
                        fill="black"
                      />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {error && <div className=" text-white">{error}</div>}

        {prediction && (
          <div>
            {/* @ts-ignore */}
            {prediction.output && (
              <div className="videoWrapper">
                {/* Use the video element instead of Image */}
                <video controls width="100%" height="auto">
                  <source
                    /* @ts-ignore */
                    src={prediction.output}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {/* @ts-ignore */}
            <p>status: {prediction.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
