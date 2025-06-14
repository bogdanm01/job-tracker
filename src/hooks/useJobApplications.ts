import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "@/api/jobApplications";
import { JobApplication } from "@/interfaces/JobApplication";

export const useJobApplications = () => {
  return useQuery<JobApplication[]>({
    queryKey: ["jobApplications"],
    queryFn: getJobApplications,
  });
};
