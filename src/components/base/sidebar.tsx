import React, { useState } from "react";
import { api } from "~/utils/api";
import { CiSearch } from "react-icons/ci";
import { IoSettingsOutline, IoCheckmark } from "react-icons/io5";
import { PiTable } from "react-icons/pi";
import { GoChevronUp } from "react-icons/go";

export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [input, setInput] = useState("");

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const { mutate, status } = api.base.create.useMutation({
    onSuccess: (data) => {
      window.location.href = `/base/${data.id}`;
    },
  });

  return (
    <div
      className={`flex h-screen flex-col border-r border-t border-gray-300 p-0 ${
        isCollapsed ? "w-16" : "w-72"
      } overflow-y-auto transition-all duration-300`}
    >
      <div aria-label="Views" className="flex flex-col">
        <div
          aria-label="Search Bar"
          className="ml-4 mr-4 mt-4 flex h-8 items-center border-b font-light"
        >
          <div className="ml-2 flex w-full justify-between">
            <div className="flex">
              <CiSearch className="ml-0" />
              <input
                type="text"
                placeholder="Find a view"
                className="ml-1 bg-transparent pl-1 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                onFocus={(e) =>
                  e.target.parentElement?.parentElement?.parentElement?.classList.add(
                    "border-blue-500",
                  )
                }
                onBlur={(e) =>
                  e.target.parentElement?.parentElement?.parentElement?.classList.remove(
                    "border-blue-500",
                  )
                }
              />
            </div>
            <IoSettingsOutline className="mr-4 text-gray-600" />
          </div>
        </div>
        <div className="ml-4 mr-4 mt-2 flex h-8 items-center justify-between bg-sky-100 font-light">
          <div className="ml-1.5 flex items-center gap-1">
            <PiTable className="text-lg text-blue-700" />
            <span className="text-sm">Grid View</span>
          </div>
          <IoCheckmark className="mr-2 text-gray-600" />
        </div>

        <div className="mt-4 flex h-8 items-center justify-between p-2 pl-4 font-light hover:cursor-pointer hover:bg-gray-200"></div>
      </div>

      {/* SidebarBottom */}
      <div
        className={`absolute bottom-32 flex w-full ${isCollapsed ? "hidden" : ""}`}
      >
        <div className="mb-4 ml-4 mr-4 flex w-full flex-col border-t">
          <button className="open-modal-button mt-2 flex h-8 items-center justify-between rounded-md hover:cursor-pointer">
            <span className="ml-2 font-extralight text-black">Create...</span>
            <GoChevronUp className="mr-3" />
          </button>
          {/* <CreateBaseModal isOpen={isModalOpen} onClose={closeModal} /> */}
        </div>
      </div>
    </div>
  );
};
