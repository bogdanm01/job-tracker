import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@heroui/dropdown";
import { User } from "@heroui/user";
import {
  BriefcaseIcon,
  CubeIcon,
  ChartPieIcon,
  FolderIcon,
  SparklesIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import SidebarNavButton from "./SidebarNavButton";

const Sidebar = () => {
  return (
    <div className="row-start-1 row-end-3 col-start-1 h-full w-[240px] flex flex-col p-3 border-r-1 border-gray-100">
      <div className="flex items-center gap-2 mt-6 ml-4">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl shadow-blue-200 p-1 rounded-md">
          <svg
            className="size-6"
            fill="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Bolt Jobs</h1>
      </div>

      {/* Navigation */}
      <nav className="mt-10 w-full flex flex-col gap-1">
        <SidebarNavButton
          icon={<BriefcaseIcon className="size-5" />}
          linkTo={"tracking"}
          text="Job Tracking"
        />
        <SidebarNavButton
          icon={<CubeIcon className="size-5" />}
          linkTo={"overview"}
          text="Overview"
        />
        <SidebarNavButton
          icon={<DocumentTextIcon className="size-5" />}
          linkTo={"resume"}
          text="Resume Builder"
        />
        <SidebarNavButton
          icon={<FolderIcon className="size-5" />}
          linkTo={"documents"}
          text="Documents"
        />
        <SidebarNavButton
          icon={<ChartPieIcon className="size-5" />}
          linkTo={"reporting"}
          text="Reporting"
        />
        <SidebarNavButton
          icon={<SparklesIcon className="size-5" />}
          linkTo={"cover"}
          text="AI Cover Letter"
        />
      </nav>
      <div className="mt-auto">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                size: "sm",
              }}
              className="transition-transform px-4 py-2 border-1 border-gray-100 justify-start w-full"
              name="Bogdan"
              description="Software engineer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              key="help_and_feedback"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              }
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              }
            >
              My Settings
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              }
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
