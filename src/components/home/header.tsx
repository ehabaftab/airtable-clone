import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";

export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: SidebarProps) => {
  const { user } = useUser() as {
    user: { imageUrl: string; username: string };
  }; // Ensure proper typing

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button aria-label="Toggle Sidebar" onClick={toggleSidebar}>
          <span className="material-icons p-1 text-gray-400 hover:font-bold">
            menu
          </span>
        </button>
        <div aria-label="icon-title" className="flex w-6 items-center">
          <Image src="/logos/airtable.svg" alt="Logo" width={48} height={48} />
          <span className="pl-1 font-mono text-xl text-gray-700">Airtable</span>
        </div>
      </div>

      <div
        aria-label="Search Bar"
        className="flex h-8 items-center rounded-full p-1.5 outline outline-1 outline-gray-300"
      >
        <div className="flex">
          <span className="material-icons text-gray-600">search</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent pl-1 text-xs text-gray-800 placeholder-gray-500"
          />
        </div>
        <span className="pl-20 pr-3 text-xs text-gray-400">⌘ K</span>
      </div>

      <div className="flex items-center" aria-label="Right-Section">
        <button
          className="x mr-6 rounded-full text-gray-600 hover:bg-gray-300"
          style={{
            fontSize: "1rem",
          }}
        >
          <span
            className="material-icons pt-1"
            style={{
              fontSize: "1rem",
            }}
          >
            help_outline
          </span>
        </button>
        <button
          className="x mr-5 rounded-full text-gray-600 outline outline-1 outline-gray-200 hover:bg-gray-300"
          style={{
            width: "1.7rem",
            height: "1.7rem",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <span
            className="material-icons pt-1"
            style={{
              fontSize: "1.25rem",
            }}
          >
            notifications_none
          </span>
        </button>

        {/* User Profile */}
        {user && (
          <Image
            src={user.imageUrl}
            className="h-7 w-7 rounded-full"
            alt={`@${user.username}'s profile picture`}
            width={36}
            height={36}
          />
        )}
      </div>
    </header>
  );
};
