import React from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export interface BaseInfo {
  id: number;
  user: { imageUrl: string; username: string };
}

export const Header = ({ id, user }: BaseInfo) => {
  const { data } = api.base.getById.useQuery({ id });
  const { mutate, status } = api.base.updateName.useMutation();

  return (
    <header className="flex flex-col">
      <div
        className="bg-maroon flex h-12 items-center justify-between p-2"
        aria-label="Top Header"
      >
        <div
          aria-label="Left Section"
          className="flex items-center justify-center gap-2"
        >
          <Link href="/">
            <div aria-label="icon-title" className="ml-2 flex w-6 items-center">
              <Image
                src="/logos/airtable.svg"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
          </Link>

          <input
            type="text"
            placeholder={data?.name}
            className="ml-2 bg-transparent font-light text-gray-200 placeholder-gray-200 outline-none"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => {
              if (e.target.value.trim().length > 0) {
                mutate({ id, name: e.target.value });
              } else {
                alert("Name must have at least 1 character.");
              }
            }}
          />
          <button className="bg-maroon-dark ml-3 flex h-6 w-12 items-center justify-center rounded-full text-xs font-extralight text-gray-200">
            Data
          </button>
          <button className="hover:bg-maroon-dark ml-1 flex h-6 w-20 items-center justify-center rounded-full text-xs font-extralight text-gray-300 hover:text-gray-200">
            Automation
          </button>
          <button className="hover:bg-maroon-dark ml-0 flex h-6 w-20 items-center justify-center rounded-full text-xs font-extralight text-gray-300 hover:text-gray-200">
            Interfaces
          </button>

          <div
            aria-label="vertical-line"
            className="h-5 border-x-0 border-l border-gray-500"
          ></div>

          <button className="hover:bg-maroon-dark flex h-6 w-16 items-center justify-center rounded-full text-xs font-extralight text-gray-300 hover:text-gray-200">
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
          <button className="hover: bg-maroon-dark mr-3 flex h-6 w-16 items-center justify-center rounded-full text-xs font-extralight text-gray-300">
            <span
              className="material-icons"
              style={{
                fontSize: "1rem",
              }}
            >
              help_outline
            </span>
            <span className="ml-1 text-xs font-extralight">Help</span>
          </button>

          <button className="text-maroon mr-4 flex h-6 w-20 items-center justify-center rounded-full bg-gray-200 text-xs font-extralight hover:bg-gray-100">
            <span
              className="material-icons"
              style={{
                fontSize: "1rem",
              }}
            >
              people_outline
            </span>
            <span className="ml-1 text-xs font-extralight">Share </span>
          </button>

          <button
            className="x text-maroon mr-5 rounded-full bg-gray-200 outline outline-1 outline-gray-200 hover:bg-gray-100"
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
            <button className="rounded-full outline outline-1 outline-gray-200">
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
      </div>
      <div
        aria-label="Table View"
        className="bg-maroon-dark flex h-6 items-center justify-between"
      >
        <div aria-label="Left Section" className="">
          <div className="ml-3 h-7 w-20 items-center justify-center bg-gray-100 align-middle text-sm">
            Table 1
          </div>
        </div>
      </div>

      <div
        aria-label="Toolbar"
        className="flex h-6 items-center justify-between bg-gray-100"
      >
        {"HU"}
      </div>
    </header>
  );
};
