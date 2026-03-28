export const metadata = {
  title: "Svensson 4x4 Studio",
  description: "Admin Dashboard",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  // We remove the <html> and <body> and just return the children!
  return <div style={{ minHeight: "100vh", margin: 0 }}>{children}</div>;
}
