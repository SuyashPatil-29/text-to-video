"use client"
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

const MyLibWrapper = ({children}: Props) => {
  const pathname = useSearchParams()
  console.log();
  
  return (
    <div className={cn(pathname.get("list") === null ? "grid gap-7 grid-cols-3" : "flex flex-col gap-4 items-center justify-between mx-auto max-w-[700px]")}>{children}</div>
  )
}

export default MyLibWrapper