import NavToggle from "@/components/NavToggle";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();
  if (!session?.user) redirect("/sign-in");

  return (
    <div
      className="flex flex-col min-h-screen pb-16 bg-[rgb(18,18,18)]]"
      // style={{backgroundImage: "url(/assets/docs-right.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "left"}}
    >
      <Navbar />
      <NavToggle />
      {children}
    </div>
  );
}
