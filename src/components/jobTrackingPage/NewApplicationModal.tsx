import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Form } from "@heroui/form";

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

const stageColorMap: Record<string, string> = {
  Applied: "bg-violet-100 text-violet-600",
  Interview: "bg-blue-100 text-blue-600",
  Offer: "bg-green-100 text-green-600",
  Rejected: "bg-red-100 text-red-600",
};

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

const NewApplicationModal = ({ isOpen, onOpenChange }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
  };

  return (
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
            <ModalBody className="block p-0">
              <Form
                className="flex flex-1 flex-col gap-3 px-6 py-2 items-stretch"
                validationErrors={errors}
                onSubmit={onSubmit}
              >
                <div className="flex items-center gap-1">
                  <h3 className="text-gray-700 text-sm ml-0.5 mb-0.5">
                    Application Details
                  </h3>
                </div>
                <div className="flex gap-2.5">
                  <Input
                    label="Job Title"
                    placeholder="Enter job title"
                    variant="bordered"
                    name="jobTitle"
                    isRequired
                  />
                  <Autocomplete
                    defaultItems={companies}
                    label="Company"
                    placeholder="Select a company"
                    variant="bordered"
                    name="company"
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
                    items={stages}
                    label="Stage"
                    variant="bordered"
                    isRequired
                    placeholder="Select application stage"
                    name="stage"
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
                  <DatePicker
                    variant="bordered"
                    label="Application Date"
                    name="appliedAt"
                  />
                </div>

                <h3 className="text-gray-700 text-sm mt-3 ml-0.5 mb-0.5">
                  Description and URL
                </h3>
                <Input
                  label="Job Description"
                  placeholder="Enter short description"
                  variant="bordered"
                  name="jobDescription"
                />

                <Input
                  label="Posting URL"
                  placeholder="Enter job posting URL"
                  variant="bordered"
                  name="jobUrl"
                />
                <footer className="flex flex-row gap-2 justify-end items-center py-4">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    // onPress={() => onSave(onClose)}
                    isLoading={isLoading}
                  >
                    {!isLoading && <PlusIcon className="size-5" />}
                    {isLoading ? "Processing" : "Add Application"}
                  </Button>
                </footer>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewApplicationModal;
