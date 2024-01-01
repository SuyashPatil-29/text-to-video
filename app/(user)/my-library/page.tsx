import MainCard from "@/components/MainCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyLibWrapper from "@/components/MyLibWrapper";
import React from "react";

type Props = {};

const MyLibrary = (props: Props) => {
  return (
    <MaxWidthWrapper className="mt-10">
      <MyLibWrapper>
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
      </MyLibWrapper>
    </MaxWidthWrapper>
  );
};

export default MyLibrary;
