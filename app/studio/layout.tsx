export const metadata = {
  title: "JimmieJimmie.com Studio",
  description: "Admin Dashboard",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", margin: 0 }}>
      {/* Hide the site header inside the Studio */}
      <style>{`header { display: none !important; }`}</style>
      {children}
    </div>
  );
}
