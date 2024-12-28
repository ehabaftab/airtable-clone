import React from "react";
import { useUser } from "@clerk/clerk-react";
import { CiSearch } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

import Image from "next/image";

export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: SidebarProps) => {
  const { user } = useUser() as {
    user: { imageUrl: string; username: string };
  };

  return (
    <header className="flex h-14 items-center justify-between">
      <div className="ml-3 flex gap-3">
        <button aria-label="Toggle Sidebar" onClick={toggleSidebar}>
          <span
            className="material-icons p-1 text-gray-400 hover:font-bold"
            style={{
              fontSize: "1.25rem",
            }}
          >
            menu
          </span>
        </button>
        <div aria-label="icon-title" className="flex w-6 items-center">
          <Image src="/logos/airtable.svg" alt="Logo" width={48} height={48} />
          <span className="pl-1 text-lg font-medium text-gray-700">
            Airtable
          </span>
        </div>
      </div>

      <button
        aria-label="Search Bar"
        className="flex h-7 w-72 items-center justify-between rounded-full p-1.5 outline outline-1 outline-gray-300 hover:shadow-md"
      >
        <div className="flex items-center">
          <CiSearch className="ml-2" />
          <span className="ml-2 text-xs font-light text-gray-500">
            Search...
          </span>
        </div>
        <span className="mr-2 pl-20 text-xs font-light text-gray-400">⌘ K</span>
      </button>

      <div className="mr-4 flex items-center" aria-label="Right-Section">
        <button className="mr-2 h-6 w-10 rounded-full pl-3 text-gray-600 hover:bg-gray-200">
          <IoHelpCircleOutline className="text-base" />
        </button>
        <button className="x mr-5 h-6 w-6 rounded-full pl-1 text-gray-600 outline outline-1 outline-gray-200 hover:bg-gray-300">
          <IoNotificationsOutline className="" />
        </button>

        {/* User Profile */}
        {user && (
          <button className="rounded-full">
            <Image
              src={user.imageUrl}
              className="h-7 w-7 rounded-full"
              alt={`@${user.username}'s profile picture`}
              width={36}
              height={36}
            />
          </button>
        )}
      </div>
    </header>
  );
};
