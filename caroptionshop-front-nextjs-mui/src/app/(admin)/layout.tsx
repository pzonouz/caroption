import AdminAppbar from "../components/Navigation/AppBar";
import "../globals.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminAppbar>{children}</AdminAppbar>;
}
