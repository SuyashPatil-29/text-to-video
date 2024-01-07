"use client";
import MainCard from "@/components/MainCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyLibWrapper from "@/components/MyLibWrapper";
import { Generation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Props = {};

const MainPage = (props: Props) => {
  const { data: myGenerations } = useQuery({
    queryKey: ["my-library"],
    queryFn: async () => {
      const { data } = await axios.get("/api/home");
      console.log("data", data);
      return data as Generation[];
    },
  });
  console.log(myGenerations);
  return (
    <MaxWidthWrapper className="mt-10">
      <MyLibWrapper>
        {myGenerations?.map((generation: any) => (
          <MainCard key={generation.id} generation={generation} />
        ))}
      </MyLibWrapper>
    </MaxWidthWrapper>
  );
};

export default MainPage;
