"use client"
// Import necessary modules and components
// Import necessary modules and components
import { cn } from '@/lib/utils';
import { LayoutGridIcon, ListIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Toggle } from './ui/toggle';
import { useState } from 'react';

// Define the component props
type Props = {};

// Define the NavToggle component
const NavToggle = (props: Props) => {
  // Get the current pathname and router from Next.js
  const pathname = usePathname();
  const router = useRouter();

  // State to toggle between icons, set initial state to true for LayoutGridIcon
  const [isGrid, setIsGrid] = useState(true);

  // Event handler for the toggle button
  const handleClick = () => {
    setIsGrid((prevIsGrid) => !prevIsGrid);

    // Update query parameter based on the toggle state
    const queryParam = isGrid ? '?list' : '?grid';
    router.push(pathname + queryParam);
  };

  // Determine which icon to display based on the state
  const icon = isGrid ? <LayoutGridIcon className="w-5 h-5" /> : <ListIcon className="w-5 h-5" />;

  // Return the JSX for the component
  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center bg-[rgb(18,18,18)] p-4">
        <div className="flex space-x-2">
          <Link
            href="/"
            className={cn(
              "text-black px-4 py-2 rounded-md w-[150px] text-center",
              pathname === "/" ? "bg-[#f5f5f5] hover:bg-[#f5f5f5]" : "bg-transparent text-white border border-[#f5f5f5]"
            )}
          >
            Explore
          </Link>
          <Link
            href="/my-library"
            className={cn(
              "text-black px-4 py-2 rounded-md w-[150px] text-center",
              pathname === "/my-library" ? "bg-[#f5f5f5] hover:bg-[#f5f5f5]" : "bg-transparent text-white border border-[#f5f5f5]"
            )}
          >
            My library
          </Link>
        </div>
        <div className="flex space-x-2">
          <Toggle className="bg-transparent text-white px-3 py-2" onClick={handleClick}>
            {icon}
          </Toggle>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

// Export the NavToggle component as the default export
export default NavToggle;
