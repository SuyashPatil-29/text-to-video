import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/authOptions";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Visualize - Sign-In',
  description: '...',
}
 
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();
  if (session) redirect("/");

  
 

  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  );
}