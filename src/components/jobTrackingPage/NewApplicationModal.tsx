import { PlusIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import validator from "validator";
import { useJobApplications } from "@/hooks/useJobApplications";

const stageColorMap: Record<string, string> = {
  Applied: "bg-violet-100 text-violet-600",
  Interview: "bg-blue-100 text-blue-600",
  Offer: "bg-green-100 text-green-600",
  Rejected: "bg-red-100 text-red-600",
};

const companiesArr = [
  {
    id: "1",
    name: "Microsoft",
    imgUrl:
      "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    id: "2",
    name: "Adobe",
    imgUrl:
      "https://cdn.brandfetch.io/id_KsyK7J9/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    id: "3",
    name: "IBM",
  },
  {
    id: "4",
    name: "Google",
    imgUrl:
      "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    id: "5",
    name: "Amazon",
  },
];

const stages = [
  {
    id: "1",
    name: "Applied",
  },
  {
    id: "2",
    name: "Interview",
  },
  {
    id: "3",
    name: "Offer",
  },
  {
    id: "4",
    name: "Rejected",
  },
];

const NewApplicationModal = ({ isOpen, onOpenChange, onClose }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companies] = useState(companiesArr);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const { refetch } = useJobApplications();

  const [selectedStage, setSelectedStage] = useState({
    id: "1",
    name: "Applied",
  });

  useEffect(() => {
    setSelectedCompany(null);
    setSelectedStage({
      id: "1",
      name: "Applied",
    });
  }, [isOpen]);

  const validateRequiredAndMinMaxLength = useCallback(
    (value: string, minLength: number, maxLength: number) => {
      if (!value) {
        return "Required";
      } else if (!validator.isLength(value, { min: minLength })) {
        return `Must be at least ${minLength} characters long`;
      } else if (!validator.isLength(value, { max: maxLength })) {
        return `Cant be longer than ${maxLength} characters`;
      }
    },
    []
  );

  const validateJobDescription = useCallback((value: string) => {
    if (value) {
      if (!validator.isLength(value, { min: 3 })) {
        return "Must be at least 3 characters long";
      } else if (!validator.isLength(value, { max: 60 })) {
        return "Cant be longer than 60 characters";
      }
    }
  }, []);

  const validateJobUrl = useCallback((value: string) => {
    if (value) {
      if (
        !validator.isURL(value, { require_tld: true, require_protocol: true })
      ) {
        return "Please enter a valid URL";
      }
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newApplication = {
      ...data,
      company: selectedCompany !== null ? selectedCompany.name : data.company,
      companyImgUrl: selectedCompany?.imgUrl || "",
      stage: selectedStage.name,
      location: "Remote",
    };

    try {
      const res = await fetch("http://localhost:3000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplication),
      });

      if (!res.ok) throw new Error("Failed to create application");

      refetch();
      onClose();
    } catch (err) {
      console.error("Error posting to API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      size="2xl"
    >
      <ModalContent>
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
          </ModalHeader>
          <ModalBody className="block p-0">
            <Form
              className="flex flex-1 flex-col gap-3 px-6 py-2 items-stretch"
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
                  validate={(value) =>
                    validateRequiredAndMinMaxLength(value, 3, 50)
                  }
                />
                <Input
                  label="Company"
                  placeholder="Enter company name"
                  variant="bordered"
                  name="companyName"
                  isRequired
                  validate={(value) =>
                    validateRequiredAndMinMaxLength(value, 1, 50)
                  }
                />
                {/* <Autocomplete
                  defaultItems={companies}
                  label="Company"
                  placeholder="Select a company"
                  variant="bordered"
                  selectedKey={selectedCompany?.id ?? null}
                  isRequired
                  name="company"
                  allowsCustomValue
                  onSelectionChange={(value) => {
                    let company = companies.find((it) => it.id === value);

                    setSelectedCompany(company ?? null);
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id}
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
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete> */}
              </div>
              <div className="flex gap-2.5">
                <Select
                  selectionMode="single"
                  items={stages}
                  label="Stage"
                  variant="bordered"
                  isRequired
                  placeholder="Select application stage"
                  selectedKeys={selectedStage.id}
                  onSelectionChange={(value) => {
                    let keys = Array.from(value as Set<string>);

                    if (keys.length) {
                      let stage = stages.find((it) => it.id == keys[0]);

                      setSelectedStage(stage!);
                    }
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.id} textValue={item.name}>
                      <div className="flex gap-2 items-center">
                        <Chip className={stageColorMap[item.name]}>
                          {item.name}
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
                validate={validateJobDescription}
              />

              <Input
                label="Posting URL"
                placeholder="Enter job posting URL"
                variant="bordered"
                name="jobUrl"
                validate={validateJobUrl}
              />
              <footer className="flex flex-row gap-2 justify-end items-center py-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" isLoading={isLoading}>
                  {!isLoading && <PlusIcon className="size-5" />}
                  {isLoading ? "Processing" : "Add Application"}
                </Button>
              </footer>
            </Form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default NewApplicationModal;
