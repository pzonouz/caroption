import TopBar from "../components/Navigation/TopBar";
import TopComponent from "../components/Navigation/TopComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section><TopBar/><TopComponent/>{children}</section>;
}
