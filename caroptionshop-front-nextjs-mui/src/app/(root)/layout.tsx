import TopBar from "../components/Navigation/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section><TopBar/>{children}</section>;
}
