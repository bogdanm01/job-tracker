import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { useCallback, useState } from "react";
import { Input } from "@heroui/input";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";

import { Chip } from "@heroui/chip";

import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ListBulletIcon,
  ChatBubbleLeftEllipsisIcon,
  FolderOpenIcon,
  RocketLaunchIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const rows = [
  {
    key: "1",
    jobTitle: "Frontend Software Developer",
    jobDescription: "Javascript dev at Microsoft",
    company: "Microsoft",
    companyImgUrl:
      "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    stage: "Applied",
    appliedAt: "10 Jun 2025",
    location: "Remote",
    updatedAt: "11 jun 2025",
    actions: "",
  },
  {
    key: "1",
    jobTitle: "Javascript Engineer",
    jobDescription: "Engineer on Angular team",
    company: "Google",
    companyImgUrl:
      "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    stage: "Interview",
    appliedAt: "08 Jun 2025",
    location: "Remote",
    updatedAt: "",
    actions: "",
  },
];

const columns = [
  {
    key: "jobTitle",
    label: "JOB TITLE",
  },
  {
    key: "company",
    label: "COMPANY",
  },
  {
    key: "stage",
    label: "STAGE",
  },
  {
    key: "appliedAt",
    label: "APPLIED DATE",
  },
  {
    key: "location",
    label: "LOCATION",
  },
  {
    key: "updatedAt",
    label: "LAST UPDATE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

const JobTrackingPage = () => {
  const [selected, setSelected] = useState<any>("applications");

  const renderCell = useCallback((application: any, columnKey: React.Key) => {
    const cellValue = application[columnKey as keyof any];

    switch (columnKey) {
      case "jobTitle": {
        return (
          <div className="flex items-center gap-3">
            <img src={application.companyImgUrl} alt="" className="w-9" />
            <div className="flex flex-col gap-0]">
              <p className="font-medium">{cellValue}</p>
              <p className="text-sm text-gray-400">
                {application.jobDescription}
              </p>
            </div>
          </div>
        );
      }
      case "stage": {
        return <Chip>{cellValue}</Chip>;
      }
      // case "appliedAt": {
      //   return <p>{cellValue}</p>;
      // }
      // case "location": {
      //   return <p>{cellValue}</p>;
      // }
      case "updatedAt": {
        return <p>{cellValue || "-"}</p>;
      }
      case "actions": {
        return <div>...</div>;
      }
      default: {
        return cellValue;
      }
    }
  }, []);

  const selectedComponent = () => {
    switch (selected) {
      case "applications": {
        return (
          <div>
            <div className="flex justify-between items-center">
              <Button color="primary" variant="shadow">
                <PlusIcon className="size-5" />
                New Application
              </Button>
              <div className="flex items-center gap-3">
                <Button isIconOnly className="bg-gray-100">
                  <AdjustmentsHorizontalIcon className="size-5" />
                </Button>
                <Input
                  className="w-72"
                  labelPlacement="outside"
                  placeholder="Search applications"
                  startContent={<MagnifyingGlassIcon className="size-5" />}
                  type="email"
                />
              </div>
            </div>
            <Table className="mt-8">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      }
      case "activities": {
        return <h1>Activities</h1>;
      }
      case "documents": {
        return <h1>Documents</h1>;
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Tabs
        className="mb-8"
        aria-label="Options"
        variant="solid"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="applications"
          title={
            <div className="flex items-center space-x-2">
              <ListBulletIcon className="size-5" />
              <span>Applications</span>
            </div>
          }
        />
        <Tab
          key="activities"
          title={
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftEllipsisIcon className="size-5" />
              <span>Activities</span>
            </div>
          }
        />
        <Tab
          key="documents"
          title={
            <div className="flex items-center space-x-2">
              <FolderOpenIcon className="size-5" />
              <span>Documents</span>
            </div>
          }
        />
        <Tab
          key="wishlist"
          title={
            <div className="flex items-center space-x-2">
              <HeartIcon className="size-5" />
              <span>Wishlist</span>
            </div>
          }
        />
      </Tabs>
      {selectedComponent()}
    </div>
  );
};

export default JobTrackingPage;
