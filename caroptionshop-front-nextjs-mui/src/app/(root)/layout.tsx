import TopBar from "../components/Navigation/TopBar";
import TopComponent from "../components/Navigation/TopComponent";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imagesRes = await fetch("http://caroption-back:8000/api/v1/files");
  const images = await imagesRes.json();

  return (
    <section>
      <TopBar />
      <TopComponent images={images} />
      {children}
    </section>
  );
}
