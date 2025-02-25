"use server";

import { ListSlides } from "@/app/components/Slide/ListSlides";

const page = async () => {
  const slidesRes = await fetch(`${process.env.BACKEND_URL}/slides`, {
    next: { tags: ["slide"] },
  });
  const filesRes = await fetch(`${process.env.BACKEND_URL}/files`, {
    next: { tags: ["files"] },
  });
  const [slides, images] = await Promise.all([
    slidesRes.json(),
    filesRes.json(),
  ]);

  return <ListSlides slides={slides} images={images} />;
};
export default page;
