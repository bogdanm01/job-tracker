import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  InformationCircleIcon,
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
import { JobApplication } from "@/interfaces/JobApplication";

import { Select, SelectSection, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";

import { Avatar } from "@heroui/avatar";

const stages = [
  {
    id: 1,
    name: "Applied",
  },
  {
    id: 2,
    name: "Interview",
  },
  {
    id: 3,
    name: "Offer",
  },
  {
    id: 4,
    name: "Rejected",
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

const companies = [
  {
    label: "Microsoft",
    imgUrl:
      "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    key: "microsoft",
  },
  {
    label: "Adobe",
    imgUrl:
      "https://cdn.brandfetch.io/id_KsyK7J9/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    key: "adobe",
  },
  {
    label: "IBM",
    key: "ibm",
  },
  {
    label: "Google",
    imgUrl:
      "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    key: "google",
  },
  {
    label: "Amazon",
    key: "amazon",
  },
];

const ApplicationsTab = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSave = (onClose: any) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button color="primary" variant="shadow" onPress={onOpen}>
          <PlusIcon className="size-5" />
          New Application
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl shadow-blue-200 p-1 rounded-md">
                      <svg
                        className="size-4"
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
                    New Job Application
                  </div>
                  {/* <p className="text-medium font-normal text-gray-600">
                    Track new job application process
                  </p> */}
                </ModalHeader>
                <ModalBody>
                  <div className="flex items-center gap-1">
                    {/* <InformationCircleIcon className="size-5" /> */}
                    <h3 className="text-gray-700 text-sm ml-0.5 mb-0.5">
                      Application Details
                    </h3>
                  </div>
                  <div className="flex gap-2.5">
                    <Input
                      // endContent={
                      //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      // }
                      label="Job Title"
                      placeholder="Enter job title"
                      // labelPlacement="outside"
                      variant="bordered"
                      isRequired
                    />
                    <Autocomplete
                      defaultItems={companies}
                      label="Company"
                      placeholder="Select a company"
                      variant="bordered"
                      isRequired
                    >
                      {(item) => (
                        <AutocompleteItem
                          key={item.key}
                          startContent={
                            <div className="flex items-center gap-3">
                              {item.imgUrl ? (
                                <img src={item.imgUrl} alt="" className="w-6" />
                              ) : (
                                <div className="flex items-center justify-center bg-indigo-50 rounded-full w-6 p-0.5">
                                  <BriefcaseIcon className="size-5 text-indigo-900" />
                                </div>
                              )}
                            </div>
                          }
                        >
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>

                  <div className="flex gap-2.5">
                    <Select
                      // className="max-w-xs"
                      items={stages}
                      label="Stage"
                      // labelPlacement="outside"
                      variant="bordered"
                      isRequired
                      placeholder="Select application stage"
                    >
                      {(stage) => (
                        <SelectItem key={stage.id} textValue={stage.name}>
                          <div className="flex gap-2 items-center">
                            <Chip className={stageColorMap[stage.name]}>
                              {stage.name}
                            </Chip>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <DatePicker variant="bordered" label="Application Date" />
                  </div>

                  <h3 className="text-gray-700 text-sm mt-3 ml-0.5 mb-0.5">
                    Description and URL
                  </h3>
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Job Description"
                    placeholder="Enter short description"
                    // labelPlacement="outside"
                    variant="bordered"
                  />

                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Posting URL"
                    placeholder="Enter job posting URL"
                    // labelPlacement="outside"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => onSave(onClose)}
                    isLoading={isLoading}
                  >
                    {!isLoading && <PlusIcon className="size-5" />}
                    {isLoading ? "Processing" : "Add Application"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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
