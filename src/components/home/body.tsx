import Link from "next/link";
import Avatar from "react-avatar";
import { api } from "~/utils/api";
import { LoadingPage } from "../loading";
import { PiStarFourLight, PiGridFour, PiTable } from "react-icons/pi";
import { GoArrowUp, GoChevronDown } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";

const AllBases = () => {
  const { data, isLoading: basesLoading } = api.base.getAll.useQuery();

  if (basesLoading) {
    return <LoadingPage />;
  }

  if (!data) return <div>Something went wrong</div>;
  return data && data.length > 0 ? (
    <div className={`ml-4 mt-2 flex flex-wrap gap-4`}>
      {data.map((base) => {
        const baseName = base.name.replace(/\s+/g, "-");
        const id = base.id;
        return (
          <Link
            href={`/base/${baseName}/${id}`}
            key={base.id}
            className="flex h-24 w-80 items-center rounded-md bg-white p-3 outline outline-1 outline-gray-300"
          >
            <Avatar
              name={`${base.name}`}
              size="50"
              textSizeRatio={2.75}
              round={"25%"}
              fgColor="#E5E7EB"
            />
            <div className="ml-3 flex flex-col">
              <div className="pt-2 text-xs">{base.name}</div>
              <div className="w-4 pt-2 text-xs font-light text-gray-500">
                {base.type}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="text-center text-gray-500">No bases created</div>
  );
};

export const Body = () => {
  return (
    <div className="flex flex-col">
      <div className="ml-3 mt-6 text-2xl font-medium">Home</div>
      <div className={`ml-3 mt-6 flex flex-wrap gap-4`}>
        <div className="flex h-24 w-80 flex-col rounded-md bg-white p-3 outline outline-1 outline-gray-300">
          <div className="flex items-center">
            <PiStarFourLight className="text-pink-600" />
            <div className="ml-2 text-sm font-medium"> Start with AI</div>
          </div>
          <div className="mt-1 text-xs font-light text-gray-500">
            Turn your process into an app with data and interfaces using AI.
          </div>
        </div>

        <div className="flex h-24 w-80 flex-col rounded-md bg-white p-3 outline outline-1 outline-gray-300">
          <div className="flex items-center">
            <PiGridFour className="text-lg text-purple-700" />
            <div className="ml-1 text-sm font-medium">Start with templates</div>
          </div>
          <div className="mt-1 text-xs font-light text-gray-500">
            Select a template to get started and customize as you go.
          </div>
        </div>

        <div className="flex h-24 w-80 flex-col rounded-md bg-white p-3 outline outline-1 outline-gray-300">
          <div className="flex items-center">
            <GoArrowUp className="text-lg text-green-700" />
            <div className="ml-1 text-sm font-medium">Quickly Upload</div>
          </div>
          <div className="mt-1 text-xs font-light text-gray-500">
            Easily migrate your existing projects in just a few minutes.
          </div>
        </div>

        <div className="flex h-24 w-80 flex-col rounded-md bg-white p-3 outline outline-1 outline-gray-300">
          <div className="flex items-center">
            <PiTable className="text-lg text-blue-800" />
            <div className="ml-1 text-sm font-medium">Start from scratch</div>
          </div>
          <div className="mt-1 text-xs font-light text-gray-500">
            Create a new blank base with custom tables, fields, and views.
          </div>
        </div>
      </div>
      <div className="ml-3 mt-4 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-sm font-light text-gray-600 hover:text-black">
            <span>Opened by you</span>
            <GoChevronDown />
          </button>
          <button className="flex items-center gap-1 text-sm font-light text-gray-600 hover:text-black">
            <span>Show all types</span>
            <GoChevronDown />
          </button>
        </div>
        <div className="mr-10 mt-1 items-center">
          <button className="mr-2">
            <AiOutlineMenu className="h-6" />
          </button>
          <button>
            <PiGridFour className="h-6 w-6 rounded-full bg-gray-200 p-0.5 text-lg" />
          </button>
        </div>
      </div>
      <div className="ml-4 mt-4 text-sm font-light text-gray-600">Today</div>
      <div aria-label="bases" className="overflow-y-auto">
        <AllBases />
      </div>
    </div>
  );
};
