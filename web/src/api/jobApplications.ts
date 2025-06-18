export const getJobApplications = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/applications`);

  if (!res.ok) {
    throw new Error("Failed to fetch job applications");
  }

  return res.json();
};
