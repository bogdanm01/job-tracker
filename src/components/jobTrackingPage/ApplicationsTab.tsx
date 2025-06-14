import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useDisclosure } from "@heroui/modal";

import NewApplicationModal from "./NewApplicationModal";

import { JobApplication } from "@/interfaces/JobApplication";

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

const ApplicationsTab = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // TODO: Use data fetching solution with caching, use state management solution (tanstack or redux)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/applications");
      const data = await res.json();

      setJobApplications(data);
    };

    fetchData();
  }, []);

  const stageColorMap: Record<string, string> = {
    Applied: "bg-violet-100 text-violet-600",
    Interview: "bg-blue-100 text-blue-600",
    Offer: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

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
        return (
          <Chip className={stageColorMap[cellValue]} variant="flat">
            {cellValue}
          </Chip>
        );
      }
      case "actions": {
        return (
          <div className="flex items-center">
            <EllipsisHorizontalIcon className="size-5" />
          </div>
        );
      }
      default: {
        return <p className="capitalize">{cellValue || "-"}</p>;
      }
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button color="primary" variant="shadow" onPress={onOpen}>
          <PlusIcon className="size-5" />
          New Application
        </Button>
        <NewApplicationModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
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
        <TableBody items={jobApplications}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTab;
