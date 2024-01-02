import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/sdxl
        version: "1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755", //99957f2369ee2916300e97390c10f642aafc8d7652c23ea55adf9d6f9bffb187
  
        // This is the text prompt that will be submitted by a form on the frontend

        input: { 
          task: "text2video",
          prompt: req.body.prompt,
            save_fps: 10,
            ddim_steps: 50,
            unconditional_guidance_scale: 12
         },
      }),
    });

    console.log("response", response);
    
  
    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }