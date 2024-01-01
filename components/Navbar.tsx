import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavbarDropdown from "./NavbarDropdown";
import { getAuthSession } from "@/lib/authOptions";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { Press_Start_2P } from "next/font/google";

const font = Press_Start_2P({
  subsets: ["greek"],
  weight: "400"
});

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession()

  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mt-4 px-4">
        <h1 className={cn("text-white font-bold text-[23px] tracking-[0.5rem]", font.className)}>VISUALIZE</h1>
        <NavbarDropdown userName={session?.user?.name as string}/>
      </div>
      <Separator className=" bg-muted-foreground mt-5"/>
    </MaxWidthWrapper>
  );
};

export default Navbar;
