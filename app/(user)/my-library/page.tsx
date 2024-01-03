"use client"
import MainCard from "@/components/MainCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyLibWrapper from "@/components/MyLibWrapper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { Generation } from "@prisma/client";
import ChatInput from "@/components/ChatInput";

type Props = {};

const MyLibrary = (props: Props) => {

  const {data:myGenerations} = useQuery({
    queryKey: ["my-library"],
    queryFn: async () =>{
      const {data} = await axios.get("/api/my-library")
      console.log("data", data)
      return data as Generation[];
    }
  })

  console.log(myGenerations);
  
  return (
    <MaxWidthWrapper className="mt-10">
      <MyLibWrapper>
        {myGenerations?.map((generation:any) => (
          <MainCard key={generation.id} generation={generation} />
        ))}
      </MyLibWrapper>
    </MaxWidthWrapper>
  );
};

export default MyLibrary;
