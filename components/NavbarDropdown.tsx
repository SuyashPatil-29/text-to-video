"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  userName: string;
};

const NavbarDropdown = ({ userName }: Props) => {
  const handleLogout = () => {
    signOut();
    redirect("/sign-in");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white capitalize">
        {userName ? userName.toUpperCase() : "..."}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
