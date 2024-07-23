import { ChevronRightIcon, DocumentDuplicateIcon, FolderIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import clsx from "clsx";

type FolderType = {
  name: string;
  folders?: FolderType[];
};

// initial folder(s)
let initialFolders: FolderType[] = [
  {
    name: "Home",
    folders: [
      {
        name: "Movies",
        folders: [
          {
            name: "Action",
            folders: [
              {
                name: "2000s",
                folders: [
                  {
                    name: "Popular",
                    folders: [
                      {
                        name: "Gladiators.mp4",
                      },
                      {
                        name: "American-Beauty.mp4",
                      },
                    ],
                  },
                ],
              },
              {
                name: "2010s",
                folders: [],
              },
            ],
          },
          {
            name: "Comedy",
            folders: [
              {
                name: "2000s",
                folders: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Pictures",
    folders: [],
  },
  {
    name: "Documents",
    folders: [],
  },
  {
    name: "password.txt",
  },
];

const App = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <ul>
        {initialFolders.map((folder) => (
          <FolderSystemItem folder={folder} key={folder.name} />
        ))}
      </ul>
    </div>
  );
};

export default App;

export const FolderSystemItem = ({ folder }: { folder: FolderType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <li className="my-1.5">
      <span className="flex items-center gap-1.5 font-medium">
        {folder.folders && folder.folders.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRightIcon
              className={clsx(
                "size-4 text-gray-500 cursor-pointer transition-transform duration-300",
                isOpen ? "rotate-90" : ""
              )}
            />
          </button>
        )}
        {folder.folders ? (
          <FolderIcon
            className={clsx("size-6 text-sky-500", folder.folders.length === 0 ? "ml-[22px]" : "")}
          />
        ) : (
          <DocumentDuplicateIcon className="size-6 ml-[22px] text-gray-500" />
        )}
        {folder.name}
      </span>
      {isOpen && (
        <ul className="pl-6">
          {folder.folders?.map((folder) => (
            <FolderSystemItem folder={folder} key={folder.name} />
          ))}
        </ul>
      )}
    </li>
  );
};
