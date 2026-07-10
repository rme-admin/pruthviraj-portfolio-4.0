import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin | Portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061a12] to-[#0b2d20] text-emerald-50">
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-6 md:p-8 overflow-auto min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
