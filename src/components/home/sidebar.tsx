import React, { useState } from "react";

export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const [isHomeCollapsed, setIsHomeCollapsed] = useState(true);
  const [isWorkspacesCollapsed, setIsWorkspacesCollapsed] = useState(true);

  return (
    <div
      className={`flex h-screen flex-col border-r border-gray-300 p-0 ${
        isCollapsed ? "w-16" : "w-72"
      } overflow-y-auto transition-all duration-300`}
    >
      <div className={` ${isCollapsed ? "hidden" : ""}`}>
        <div className="mt-4 flex h-8 cursor-pointer items-center justify-between p-2 pl-4 font-light hover:bg-gray-200">
          <span>Home</span>
          <span
            className="material-icons pl-1 hover:bg-gray-300"
            onClick={() => setIsHomeCollapsed(!isHomeCollapsed)}
            style={{
              fontSize: "1rem",
              width: "1.5rem",
              height: "1.5rem",
              alignContent: "center",
            }}
          >
            {isHomeCollapsed ? "chevron_right" : "expand_more"}
          </span>
        </div>
        {!isHomeCollapsed && (
          <div className="flex items-center gap-1 pl-4">
            <span
              className="material-icons items-center pl-1.5 text-gray-400 outline outline-1 outline-gray-300"
              style={{
                fontSize: "1.25rem",
                width: "3rem",
                height: "2rem",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              star_outline
            </span>
            <span className="text-xxs flex p-2 font-extralight text-gray-500 hover:bg-gray-200">
              Your starred bases, interfaces, and workspaces will appear here
            </span>
          </div>
        )}
        <div className="mt-4 flex h-8 cursor-pointer items-center justify-between p-2 pl-4 font-light hover:bg-gray-200">
          <span>All workspaces</span>
          <span
            className="material-icons pl-1 hover:bg-gray-300"
            onClick={() => setIsWorkspacesCollapsed(!isWorkspacesCollapsed)}
            style={{
              fontSize: "1rem",
              width: "1.5rem",
              height: "1.5rem",
              alignContent: "center",
            }}
          >
            {isWorkspacesCollapsed ? "chevron_right" : "expand_more"}
          </span>
        </div>
        {!isWorkspacesCollapsed && (
          <div className="flex items-center gap-1 pl-4">
            {/* Add collapsible content for All workspaces here */}
            <span
              className="material-icons items-center pl-1.5 text-gray-400 outline outline-1 outline-gray-300"
              style={{
                fontSize: "1.25rem",
                width: "2rem",
                height: "2rem",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              groups_outlined
            </span>
            <span className="flex p-2 text-xs font-light text-gray-800 hover:bg-gray-200">
              My First Workspace
            </span>
          </div>
        )}
      </div>

      {/* SidebarBottom */}
      <div
        className={`absolute bottom-14 flex w-full ${isCollapsed ? "hidden" : ""}`}
      >
        <div className="absolute bottom-0 flex w-full flex-col pb-4">
          <>
            <div
              aria-label="horizontal-line"
              className="mb-4 ml-5 mr-5 border-b"
            ></div>
          </>
          <button className="mb-2 ml-4 mr-4 flex items-center pb-1 pl-1 hover:cursor-pointer hover:bg-gray-200">
            <span
              className="material-icons w-5 text-gray-600"
              style={{
                fontSize: "1rem",
              }}
            >
              import_contacts_outline
            </span>
            <span className="r-2 text-sm font-light text-gray-800">
              Templates and apps
            </span>
          </button>
          <button className="mb-2 ml-4 mr-4 flex items-center pb-1 pl-1 hover:cursor-pointer hover:bg-gray-200">
            <span
              className="material-icons w-5 text-gray-600"
              style={{
                fontSize: "1rem",
              }}
            >
              local_mall_outline
            </span>
            <span className="r-2 text-sm font-extralight text-gray-800">
              Marketplace
            </span>
          </button>

          <button className="mb-2 ml-4 mr-4 flex items-center pb-1 pl-1 hover:cursor-pointer hover:bg-gray-200">
            <span
              className="material-icons w-5 text-gray-600"
              style={{
                fontSize: "1rem",
              }}
            >
              file_upload_outline
            </span>
            <span className="r-2 text-sm font-extralight text-gray-800">
              Import
            </span>
          </button>

          <button className="mb-2 ml-4 mr-4 flex h-8 items-center justify-center rounded-md bg-blue-500 hover:cursor-pointer">
            <span
              className="material-icons w-5 text-white"
              style={{
                fontSize: "1rem",
              }}
            >
              add
            </span>
            <span className="r-2 text-sm font-extralight text-white">
              Create
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
