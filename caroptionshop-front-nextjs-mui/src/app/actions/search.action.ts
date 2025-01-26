"use server";

const SearchAction = async (_prevState: any, formData: FormData) => {
  if (!formData.get("search")) {
    return [];
  }
  const searchRes = await fetch(
    `${process.env.BACKEND_URL}/search/?q=${formData.get("search")}`,
  );
  if (searchRes.ok) {
    const search = await searchRes.json();
    return search;
  }
  return [];
};

export { SearchAction };
