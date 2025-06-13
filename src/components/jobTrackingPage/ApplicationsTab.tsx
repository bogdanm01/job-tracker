import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { useCallback } from "react";
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

const rows = [
  {
    id: "1",
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
    id: "2",
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
  {
    id: "3",
    jobTitle: "Javascript Engineer",
    jobDescription: "Engineer on Angular team",
    company: "Adobe",
    companyImgUrl:
      "https://cdn.brandfetch.io/id_KsyK7J9/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    stage: "Interview",
    appliedAt: "08 Jun 2025",
    location: "Remote",
    updatedAt: "",
    actions: "",
  },
];

const ApplicationsTab = () => {
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
      case "updatedAt": {
        return <p>{cellValue || "-"}</p>;
      }
      case "actions": {
        return (
          <div className="flex items-center">
            <EllipsisHorizontalIcon className="size-5" />
          </div>
        );
      }
      default: {
        return cellValue;
      }
    }
  }, []);

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
