"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Trophy,
  GraduationCap,
  Users,
  Image,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/site", label: "Site Settings", icon: Settings },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/references", label: "References", icon: Users },
  { href: "/admin/media", label: "Media", icon: Image },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#061a12]/80 backdrop-blur-xl min-h-screen flex flex-col">
      <div className="p-5 border-b border-white/10">
        <Link href="/admin" className="text-lg font-bold gradient-text">
          Admin Panel
        </Link>
        <p className="text-xs text-emerald-400/50 mt-1">Content Management</p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                  : "text-emerald-200/60 hover:text-emerald-200 hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-emerald-200/60 hover:text-emerald-200 hover:bg-white/5"
        >
          <ExternalLink size={16} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-300/70 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
