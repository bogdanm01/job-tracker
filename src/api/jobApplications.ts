export const getJobApplications = async () => {
  const res = await fetch("http://localhost:3000/applications");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
