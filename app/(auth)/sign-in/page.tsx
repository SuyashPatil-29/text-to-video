"use client";
import UseGithubButton from "@/components/UseGithubButton";
import UseGoogleButton from "@/components/UseGoogleButton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex w-screen h-screen">
      <div className=" w-[58vw] bg-[rgb(255,237,210)] flex items-center justify-center">
        <video width="600px" height="600px" loop autoPlay muted>
          <source
            /* @ts-ignore */
            src="/VISUALIZE.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-[42vw] bg-[rgb(18,18,18)] flex flex-col justify-center gap-6">
        <div className="text-white ml-16">
          <h1 className="text-[rgb(255,237,210)] font-black text-[33px]">
            Ready to use Visualize?
          </h1>
          <p className=" text-[16px]">Sign in</p>
        </div>

        <div className="ml-16 mr-36 flex flex-col gap-5 w-[375px]">
          <UseGoogleButton>Sign in with Google</UseGoogleButton>
          <UseGithubButton>Sign in with Github</UseGithubButton>

          <p className=" text-muted-foreground">
            By signing in, you are agreeing to the{" "}
            <span className=" underline underline-offset-[3px]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className=" underline underline-offset-[3px]">
              Privacy Policy
            </span>
          </p>
          <Separator className="bg-gray-500 mt-3" />
        </div>
      </div>
    </main>
  );
}
