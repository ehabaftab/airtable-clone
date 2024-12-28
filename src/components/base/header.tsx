import React from "react";
import { SiAirtable } from "react-icons/si";
import { IoNotificationsOutline, IoFilterOutline } from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";
import { VscAdd } from "react-icons/vsc";
import { CgFormatLineHeight } from "react-icons/cg";
import { GrShare } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import {
  PiGridFour,
  PiTable,
  PiUsersThree,
  PiArrowsDownUp,
  PiPaintBucket,
} from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";

import { FaRegRectangleList } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { Span } from "next/dist/trace";

export interface BaseInfo {
  id: number;
  user: { imageUrl: string; username: string };
}

export const Header = ({ id, user }: BaseInfo) => {
  const { data } = api.base.getById.useQuery({ id });
  const { mutate, status } = api.base.updateName.useMutation();

  return (
    <header className="bg-maroon flex flex-col">
      <div
        className="flex h-14 items-center justify-between p-2"
        aria-label="Top Header"
      >
        <div
          aria-label="Left Section"
          className="flex items-center justify-center gap-3"
        >
          <Link href="/">
            <div aria-label="icon-title" className="ml-3 flex w-6 items-center">
              <SiAirtable className="text-xl text-white" />
            </div>
          </Link>
          <div className="flex items-center">
            <input
              type="text"
              placeholder={data?.name}
              className="ml-1 w-9 bg-transparent text-base font-medium text-gray-200 placeholder-gray-200 outline-none"
              style={{
                width: `${Math.max(data?.name?.length || 1, 1) * 8}px`,
              }}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => {
                if (e.target.value.trim().length > 0) {
                  mutate({ id, name: e.target.value });
                } else {
                  alert("Name must have at least 1 character.");
                }
              }}
              onInput={(e) => {
                const placeholderLength = data?.name?.length || 0;
                const inputLength = (e.target as HTMLInputElement).value.length;
                const maxLength = Math.max(placeholderLength, inputLength);
                (e.target as HTMLInputElement).style.width =
                  `${Math.max(maxLength, 1) * 8}px`;
              }}
            />
            <GoChevronDown className="ml-0.5 text-gray-300" />
          </div>
          <button className="bg-maroon-dark ml-1 flex h-6 w-14 items-center justify-center rounded-full text-sm font-light text-gray-100">
            Data
          </button>
          <button className="hover:bg-maroon-dark ml-1 flex h-6 w-20 items-center justify-center rounded-full text-sm font-light text-gray-200 hover:text-gray-200">
            Automation
          </button>
          <button className="hover:bg-maroon-dark ml-0 flex h-6 w-20 items-center justify-center rounded-full text-sm font-light text-gray-200 hover:text-gray-200">
            Interfaces
          </button>

          <div
            aria-label="vertical-line"
            className="h-5 border-x-0 border-l border-gray-500"
          ></div>

          <button className="hover:bg-maroon-dark flex h-6 w-16 items-center justify-center rounded-full text-sm font-light text-gray-200 hover:text-gray-200">
            Forms
          </button>
        </div>

        <div
          className="flex items-center justify-center p-2"
          aria-label="Right-Section"
        >
          <button className="hover:bg-maroon-dark mr-3 flex h-6 w-8 items-center justify-center rounded-full text-xs font-extralight text-gray-200">
            <span
              className="material-icons"
              style={{
                fontSize: "1rem",
              }}
            >
              history
            </span>
          </button>
          <button className="hover: mr-3 flex h-6 w-16 items-center justify-center rounded-full text-xs font-extralight text-gray-300">
            <span
              className="material-icons"
              style={{
                fontSize: "1rem",
              }}
            >
              help_outline
            </span>
            <span className="ml-1 text-sm font-extralight">Help</span>
          </button>

          <button className="text-maroon mr-4 flex h-7 w-20 items-center justify-center rounded-full bg-gray-200 text-xs font-extralight hover:bg-gray-100">
            <span
              className="material-icons"
              style={{
                fontSize: "1rem",
              }}
            >
              people_outline
            </span>
            <span className="ml-1 text-sm font-extralight">Share </span>
          </button>

          <button
            className="text-maroon mr-4 flex items-center justify-center rounded-full bg-gray-200 outline outline-1 outline-gray-200 hover:bg-gray-100"
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
          >
            <IoNotificationsOutline />
          </button>

          {/* User Profile */}
          {user && (
            <button className="rounded-full outline outline-1 outline-gray-200">
              <Image
                src={user.imageUrl}
                className="rounded-full"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
                alt={`@${user.username}'s profile picture`}
                width={30}
                height={36}
              />
            </button>
          )}
        </div>
      </div>
      <div
        aria-label="Table View"
        className="flex h-9 items-center justify-between"
      >
        <div
          aria-label="Left Section"
          className="bg-maroon-dark mr-2 flex h-full w-full items-center rounded-md"
        >
          <div className="ml-3 flex h-9 w-20 items-center justify-center gap-1 rounded-t bg-white text-sm font-light">
            <span>Table 1</span>
            <GoChevronDown className="mb-0.5 text-sm" />
          </div>
          <GoChevronDown className="mb-0.5 ml-3 text-gray-200" />
          <div
            aria-label="vertical-line"
            className="mb-0.5 ml-3 h-3 border-l border-gray-400 font-light"
          ></div>
          <button className="ml-3 flex items-center text-gray-300 hover:text-gray-200">
            <VscAdd />
            <span className="ml-2 text-sm font-light text-gray-200">
              Add or import
            </span>
          </button>
        </div>
        <div
          aria-label="Right Section"
          className="bg-maroon-dark flex h-full items-center gap-6 rounded-md"
        >
          <button className="ml-3 text-sm font-light text-gray-200 hover:text-gray-200">
            Extensions
          </button>
          <button className="mr-3 flex gap-1 text-sm font-light text-gray-200 hover:text-gray-200">
            <span>Tools</span>
            <GoChevronDown className="mt-0.5 text-sm" />
          </button>
        </div>
      </div>

      <div
        aria-label="Toolbar"
        className="flex h-10 items-center justify-between bg-white"
      >
        <div aria-label="Left Section" className="mr-3 flex items-center gap-2">
          <button className="ml-3 flex h-7 w-16 items-center justify-center gap-1 bg-gray-100 text-sm font-light text-black">
            <AiOutlineMenu />
            <span>Views</span>
          </button>
          <div
            aria-label="vertical-line"
            className="mb-0.5 h-4 border-l border-gray-400 font-light"
          ></div>

          <button className="flex h-7 w-36 items-center justify-center gap-2 rounded font-normal text-black hover:bg-gray-100">
            <PiTable className="text-lg text-blue-700" />
            <span className="text-sm">Grid view</span>
            <PiUsersThree className="text-lg text-black" />
            <GoChevronDown className="text-sm" />
          </button>

          <button className="flex h-7 w-28 items-center justify-center gap-1 rounded font-extralight text-black hover:bg-gray-100">
            <FaRegEyeSlash className="text-black" />
            <span className="text-sm">Hide Fields</span>
          </button>

          <button className="flex h-7 w-16 items-center justify-center gap-1 rounded font-extralight text-black hover:bg-gray-100">
            <IoFilterOutline className="text-black" />
            <span className="text-sm">Filter</span>
          </button>

          <button className="flex h-7 w-20 items-center justify-center gap-1.5 rounded font-extralight text-black hover:bg-gray-100">
            <FaRegRectangleList className="text-sm text-black" />
            <span className="text-sm">Group</span>
          </button>

          <button className="flex h-7 w-14 items-center justify-center gap-1 rounded font-extralight text-black hover:bg-gray-100">
            <PiArrowsDownUp className="text-black" />
            <span className="text-sm">Sort</span>
          </button>

          <button className="flex h-7 w-16 items-center justify-center gap-1 rounded font-extralight text-black hover:bg-gray-100">
            <PiPaintBucket className="text-black" />
            <span className="text-sm">Color</span>
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded p-0 font-extralight text-black hover:bg-gray-100">
            <CgFormatLineHeight
              className="text-lg text-gray-700"
              style={{ transform: "rotate(180deg)" }}
            />
          </button>

          <button className="flex h-7 w-32 items-center justify-center gap-1 rounded font-extralight text-black hover:bg-gray-100">
            <GrShare className="mb-0.5 text-xs text-black" />
            <span className="text-sm">Share and sync</span>
          </button>
        </div>
        <div aria-label="Right Section" className="flex items-center">
          <button className="mr-2 flex h-7 w-6 items-center justify-center gap-1 rounded font-extralight text-black hover:bg-gray-100">
            <CiSearch className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
};
