import Link from "next/link";
import {
  FolderKanban,
  Briefcase,
  Trophy,
  GraduationCap,
  Users,
  Image,
  Settings,
} from "lucide-react";

const cards = [
  { href: "/admin/site", label: "Site Settings", desc: "Hero, About & Contact", icon: Settings },
  { href: "/admin/projects", label: "Projects", desc: "Research & technical projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", desc: "Work history & roles", icon: Briefcase },
  { href: "/admin/achievements", label: "Achievements", desc: "Awards & certifications", icon: Trophy },
  { href: "/admin/education", label: "Education", desc: "Academic qualifications", icon: GraduationCap },
  { href: "/admin/references", label: "References", desc: "Professional references", icon: Users },
  { href: "/admin/media", label: "Media", desc: "Gallery images", icon: Image },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-emerald-50 mb-2">Dashboard</h1>
      <p className="text-emerald-400/60 text-sm mb-8">
        Manage your portfolio content. Changes are reflected on the live site immediately.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors">
              <Icon size={20} className="text-emerald-400" />
            </div>
            <h2 className="font-semibold text-emerald-100 group-hover:text-emerald-300 transition-colors">
              {label}
            </h2>
            <p className="text-xs text-emerald-400/50 mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
