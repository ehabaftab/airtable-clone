import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";

const Header = ({ toggleSidebar }: SidebarProps) => {
  const { user } = useUser();

  return (
    <header className="flex h-6 items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle Sidebar"
          // className="p-1"
          onClick={toggleSidebar}
        >
          <span className="material-icons p-1 text-gray-400 hover:font-bold">
            menu
          </span>
        </button>
        <div aria-label="icon-title" className="flex w-6 items-center">
          <Image src="/logos/airtable.svg" alt="Logo" width={48} height={48} />
          <span className="font-mono text-xl text-gray-700">Airtable</span>
        </div>
      </div>

      <div
        aria-label="Search Bar"
        className="flex items-center rounded-full p-1.5 outline outline-1 outline-gray-300"
      >
        <div className="flex">
          <span className="material-icons w-4 font-bold text-gray-600">
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent text-xs text-gray-800 placeholder-gray-600"
          />
        </div>
        <span className="mr-3 text-xs text-gray-500">⌘ K</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <button className="p-2">
          <span className="material-icons rounded-full text-sm text-gray-400 hover:bg-gray-300">
            help_outline
          </span>
        </button>
        <button className="rounded-full p-3 hover:bg-gray-100">
          <span className="material-icons text-gray-400">
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

const SidebarBases = () => {
  const { data, isLoading: basesLoading } = api.base.getAll.useQuery();

  if (basesLoading) {
    return <LoadingPage />;
  }

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data?.map((base) => (
        <div key={base.id} className="border-b border-slate-700 p-8">
          {base.name}
        </div>
      ))}
    </div>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => (
  <div
    className={`flex h-screen flex-col border-r border-gray-300 bg-gray-100 ${
      isCollapsed ? "w-16" : "w-64"
    } transition-all duration-300`}
  >
    <div className={`flex flex-col p-2 ${isCollapsed ? "hidden" : ""}`}>
      <span className="p-2 hover:bg-gray-200">Home</span>
      <span className="p-2 hover:bg-gray-200">My Bases</span>
      <span className="p-2 hover:bg-gray-200">Settings</span>
    </div>
  </div>
);

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  // start fetching to use cached data
  api.base.getAll.useQuery();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>Airtable Clone Home Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <main>
        <div>
          <div className="border-b border-gray-300 p-4">
            {!isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />{" "}
              </div>
            )}
            {isSignedIn && (
              <div>
                <Header
                  isCollapsed={isCollapsed}
                  toggleSidebar={toggleSidebar}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </div>
        {/* <div className="justify-start">
          <SidebarBases />
        </div> */}
      </main>
    </>
  );
}
