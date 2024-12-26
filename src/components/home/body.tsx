import Link from "next/link";
import Avatar from "react-avatar";
import { api } from "~/utils/api";
import { LoadingPage } from "../loading";

const AllBases = () => {
  const { data, isLoading: basesLoading } = api.base.getAll.useQuery();

  if (basesLoading) {
    return <LoadingPage />;
  }

  if (!data) return <div>Something went wrong</div>;
  return data && data.length > 0 ? (
    <div className={`mt-4 flex flex-wrap gap-4 p-2`}>
      {data.map((base) => {
        const baseName = base.name.replace(/\s+/g, "-");
        const id = base.id;
        return (
          <Link
            href={`/base/${baseName}/${id}`}
            key={base.id}
            className="flex h-24 w-80 items-center rounded-md bg-gray-100 p-3 outline outline-1 outline-gray-300"
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
      <div className="ml-3 mt-6 text-2xl">Home</div>
      <div className={`mt-4 flex flex-wrap gap-4 p-2`}>
        <div className="flex h-20 w-64 flex-col rounded-md bg-gray-100 p-3 outline outline-1 outline-gray-300">
          <div className="text-sm">Start with AI</div>
          <div className="text-xs font-light text-gray-500">
            Turn your process into an app with data and interfaces using AI.
          </div>
        </div>

        <div className="flex h-20 w-64 flex-col rounded-md bg-gray-100 p-3 outline outline-1 outline-gray-300">
          <div className="text-sm">Start with templates</div>
          <div className="text-xs font-light text-gray-500">
            Select a template to get started and customize as you go.
          </div>
        </div>

        <div className="flex h-20 w-64 flex-col rounded-md bg-gray-100 p-3 outline outline-1 outline-gray-300">
          <div className="text-sm">Quickly Upload</div>
          <div className="text-xs font-light text-gray-500">
            Easily migrate your existing projects in just a few minutes.
          </div>
        </div>

        <div className="flex h-20 w-64 flex-col rounded-md bg-gray-100 p-3 outline outline-1 outline-gray-300">
          <div className="text-sm">Start from scratch</div>
          <div className="text-xs font-light text-gray-500">
            Create a new blank base with custom tables, fields, and views.
          </div>
        </div>
      </div>
      <div className="ml-2 mt-6 text-2xl">Bases</div>
      <div aria-label="bases">
        <AllBases />
      </div>
    </div>
  );
};
