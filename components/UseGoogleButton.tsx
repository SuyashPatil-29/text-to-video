import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import google from "../public/google.svg"; 
import Image from "next/image";

interface UseGoogleButtonProps {
  children: ReactNode;
}

const logInWithGoogle = () => {
  signIn("google", { callbackUrl: "http://localhost:3000/" });
}

const UseGoogleButton = ({ children }: UseGoogleButtonProps) => {
  return (
    <Button variant="signin" onClick={logInWithGoogle}>
      <Image src={google.src} width={4} height={4}  alt="google" className="mr-2 h-9 w-9"/>
      {children}
    </Button>
  );
};

export default UseGoogleButton;
