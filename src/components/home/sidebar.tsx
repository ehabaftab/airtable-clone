import React, { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { BsUpload } from "react-icons/bs";
import { PiStorefrontLight } from "react-icons/pi";
import { VscAdd } from "react-icons/vsc";

import { api } from "~/utils/api";
import { useRouter } from "next/router";

export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const [isHomeCollapsed, setIsHomeCollapsed] = useState(true);
  const [isWorkspacesCollapsed, setIsWorkspacesCollapsed] = useState(true);
  const router = useRouter();

  const { mutate } = api.base.create.useMutation({
    onSuccess: (data) => {
      const baseName = data.name.replace(/\s+/g, "-");
      void router.push(`/base/${baseName}/${data.id}`);
    },
  });

  return (
    <div
      className={`flex h-screen flex-col border-r border-gray-300 p-0 ${
        isCollapsed ? "w-16" : "w-72"
      } overflow-y-auto transition-all duration-300`}
    >
      <div className={` ${isCollapsed ? "hidden" : ""}`}>
        <div className="mt-4 flex h-8 cursor-pointer items-center justify-between pl-4 font-light hover:bg-gray-100">
          <span className="ml-1 text-sm">Home</span>
          <span
            className="material-icons mr-3 text-gray-500 hover:bg-gray-300"
            onClick={() => setIsHomeCollapsed(!isHomeCollapsed)}
            style={{
              fontSize: "1.1rem",
              width: "1.5rem",
              height: "1.5rem",
              alignContent: "center",
            }}
          >
            {isHomeCollapsed ? "chevron_right" : "expand_more"}
          </span>
        </div>
        {!isHomeCollapsed && (
          <div className="ml-3 mr-3">
            <div className="mt-2 flex w-full items-center gap-1">
              {/* Add collapsible content for All workspaces here */}
              <span
                className="material-icons ml-2.5 items-center pl-1 text-gray-400 outline outline-1 outline-gray-300"
                style={{
                  fontSize: "1.1rem",
                  width: "2.15rem",
                  height: "1.7rem",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                star_outline
              </span>
              <span className="flex p-2 text-xxs font-extralight text-gray-500">
                Your starred bases, interfaces, and workspaces will appear here
              </span>
            </div>
          </div>
        )}
        <div className="mt-3 flex h-8 items-center justify-between pl-4 font-light hover:cursor-pointer hover:bg-gray-100">
          <span className="ml-1 text-sm">All workspaces</span>
          <div className="mr-3 flex items-center">
            <VscAdd className="mr-2 text-sm" />
            <span
              className="material-icons text-gray-500 hover:cursor-pointer hover:bg-gray-300"
              onClick={() => setIsWorkspacesCollapsed(!isWorkspacesCollapsed)}
              style={{
                fontSize: "1.1rem",
                width: "1.5rem",
                height: "1.5rem",
                alignContent: "center",
              }}
            >
              {isWorkspacesCollapsed ? "chevron_right" : "expand_more"}
            </span>
          </div>
        </div>
        {!isWorkspacesCollapsed && (
          <div className="ml-3 mr-3">
            <button className="mt-2 flex w-full items-center gap-1 hover:bg-gray-200">
              {/* Add collapsible content for All workspaces here */}
              <span
                className="material-icons ml-2.5 items-center bg-gray-200 pl-0.5 text-gray-400"
                style={{
                  fontSize: "1.25rem",
                  width: "1.6rem",
                  height: "1.5rem",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                groups_outlined
              </span>
              <span className="flex p-2 text-xs font-light text-gray-800">
                My First Workspace
              </span>
            </button>
          </div>
        )}
      </div>

      {/* SidebarBottom */}
      <div
        className={`absolute bottom-11 flex w-full ${isCollapsed ? "hidden" : ""}`}
      >
        <div className="mb-4 flex w-full flex-col">
          <div
            aria-label="horizontal-line"
            className="mb-5 ml-5 mr-5 border-b"
          ></div>

          <div className="flex h-7 items-center">
            <button className="ml-4 mr-3 flex h-7 w-full items-center pl-1 hover:cursor-pointer hover:bg-gray-100">
              <IoBookOutline className="text-xs" />
              <span className="ml-1 text-xs font-light text-gray-800">
                Templates and apps
              </span>
            </button>
          </div>
          <div className="flex h-7 items-center">
            <button className="ml-4 mr-3 flex h-7 w-full items-center pl-0.5 hover:cursor-pointer hover:bg-gray-100">
              <PiStorefrontLight className="" />
              <span className="ml-1 text-xs font-light text-gray-800">
                Marketplace
              </span>
            </button>
          </div>

          <div className="mb-4 flex h-7 items-center">
            <button className="ml-4 mr-3 flex h-7 w-full items-center pl-1 hover:cursor-pointer hover:bg-gray-100">
              <BsUpload className="text-xs" />
              <span className="ml-1 text-xs font-extralight text-gray-800">
                Import
              </span>
            </button>
          </div>
          <button
            onClick={() => mutate({ name: "Untitled Base" })}
            className="open-modal-button mb-2 ml-4 mr-4 flex h-8 items-center justify-center rounded-md bg-blue-600 hover:cursor-pointer"
          >
            <span
              className="material-icons w-5 text-white"
              style={{
                fontSize: "1rem",
              }}
            >
              add
            </span>
            <span className="r-2 text-xs font-extralight text-white">
              Create
            </span>
          </button>
          {/* <CreateBaseModal isOpen={isModalOpen} onClose={closeModal} /> */}
        </div>
      </div>
    </div>
  );
};
