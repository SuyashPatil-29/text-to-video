"use client";

import Head from "next/head";
import { useState } from "react";
import "../globals.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import ChatInput from "@/components/ChatInput";

const sleep = (ms:any) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: e.target.prompt.value,
          userId: session?.user.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.detail);
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
        prompt: e.target.prompt.value,
        userId: session?.user.id,
        videoUrl: prediction.output,
        status: prediction.status,
        id: prediction.id,
        visibility: "PUBLIC",
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
    <div className="container text-white">
      <Head>
        <title>Replicate + Next.js</title>
      </Head>

      <p>
        Dream something with{" "}
        <a href="https://replicate.com/stability-ai/stable-diffusion">SDXL</a>:
      </p>

      {/* <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="Enter a prompt to display an image"
          className=" text-black"
        />
        <button type="submit">Go!</button>
      </form> */}

      {error && <div>{error}</div>}

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
  );
}
