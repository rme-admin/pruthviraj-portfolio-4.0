"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import type { ContentType } from "@/types";

interface ContentEditorProps {
  type: ContentType;
  title: string;
  isSiteSettings?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function linesToArray(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function arrayToLines(arr: string[]): string {
  return arr.join("\n");
}

export default function ContentEditor({ type, title, isSiteSettings }: ContentEditorProps) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Record<string, unknown>>({});
  const [isNew, setIsNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/content/${type}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (payload: unknown) => {
    setSaving(true);
    setMessage("");
    const res = await fetch(`/api/content/${type}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Saved successfully!");
      setData(payload);
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Failed to save. Please try again.");
    }
  };

  const handleSiteSave = () => save(data);

  const startEdit = (index: number) => {
    const items = data as Record<string, unknown>[];
    setEditItem({ ...items[index] });
    setEditingIndex(index);
    setIsNew(false);
  };

  const startNew = () => {
    setEditItem({ id: "", title: "", summary: "" });
    setEditingIndex(-1);
    setIsNew(true);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditItem({});
    setIsNew(false);
  };

  const saveItem = async () => {
    const items = [...(data as Record<string, unknown>[])];
    const item = { ...editItem };

    if (!item.id && item.title) {
      item.id = slugify(String(item.title));
    }

    if (isNew) {
      items.push(item);
    } else if (editingIndex !== null && editingIndex >= 0) {
      items[editingIndex] = item;
    }

    await save(items);
    cancelEdit();
  };

  const deleteItem = async (index: number) => {
    if (!confirm("Delete this item?")) return;
    const items = [...(data as Record<string, unknown>[])];
    items.splice(index, 1);
    await save(items);
  };

  const updateSiteField = (section: string, field: string, value: unknown) => {
    setData((prev: unknown) => {
      const current = prev as Record<string, Record<string, unknown>>;
      return {
        ...current,
        [section]: { ...current[section], [field]: value },
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="w-6 h-6 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (isSiteSettings) {
    const site = data as {
      hero: {
        name: string;
        tagline: string;
        badge: string;
        focusArea?: string;
        status?: string;
        statusNote?: string;
        stats?: { val: string; label: string }[];
      };
      about: { bio: string; skills: string[] };
      contact: { email: string; phone: string; location: string; linkedin?: string };
    };

    const statsToLines = (stats: { val: string; label: string }[] = []) =>
      stats.map((s) => `${s.val}|${s.label}`).join("\n");

    const linesToStats = (text: string) =>
      text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line) => {
          const [val, label] = line.split("|").map((s) => s.trim());
          return { val: val || "", label: label || "" };
        })
        .filter((s) => s.val && s.label);

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-emerald-50">{title}</h1>
          <button
            onClick={handleSiteSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm hover:bg-emerald-600 disabled:opacity-60"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>

        {message && (
          <div className="mb-4 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
            {message}
          </div>
        )}

        <div className="space-y-6">
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Hero Section</h2>
            <div className="space-y-3">
              <Field label="Name" value={site.hero.name} onChange={(v) => updateSiteField("hero", "name", v)} />
              <Field label="Tagline" value={site.hero.tagline} onChange={(v) => updateSiteField("hero", "tagline", v)} multiline />
              <Field label="Badge" value={site.hero.badge} onChange={(v) => updateSiteField("hero", "badge", v)} />
              <Field label="Focus Area" value={site.hero.focusArea || ""} onChange={(v) => updateSiteField("hero", "focusArea", v)} />
              <Field label="Status" value={site.hero.status || ""} onChange={(v) => updateSiteField("hero", "status", v)} />
              <Field label="Status Note" value={site.hero.statusNote || ""} onChange={(v) => updateSiteField("hero", "statusNote", v)} />
              <Field
                label="Stats (format: value|label, one per line)"
                value={statsToLines(site.hero.stats)}
                onChange={(v) => updateSiteField("hero", "stats", linesToStats(v))}
                multiline
              />
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">About Section</h2>
            <div className="space-y-3">
              <Field label="Bio" value={site.about.bio} onChange={(v) => updateSiteField("about", "bio", v)} multiline />
              <Field
                label="Skills (one per line)"
                value={arrayToLines(site.about.skills)}
                onChange={(v) => updateSiteField("about", "skills", linesToArray(v))}
                multiline
              />
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Contact Info</h2>
            <div className="space-y-3">
              <Field label="Email" value={site.contact.email} onChange={(v) => updateSiteField("contact", "email", v)} />
              <Field label="Phone" value={site.contact.phone} onChange={(v) => updateSiteField("contact", "phone", v)} />
              <Field label="Location" value={site.contact.location} onChange={(v) => updateSiteField("contact", "location", v)} />
              <Field label="LinkedIn URL" value={site.contact.linkedin || ""} onChange={(v) => updateSiteField("contact", "linkedin", v)} />
            </div>
          </section>
        </div>
      </div>
    );
  }

  const items = data as Record<string, unknown>[];
  const displayKey = items[0]?.title ? "title" : items[0]?.name ? "name" : items[0]?.degree ? "degree" : "id";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-emerald-50">{title}</h1>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm hover:bg-emerald-600"
        >
          <Plus size={14} />
          Add New
        </button>
      </div>

      {message && (
        <div className="mb-4 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
          {message}
        </div>
      )}

      {editingIndex !== null && (
        <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-emerald-400">
              {isNew ? "Add New Item" : "Edit Item"}
            </h2>
            <button onClick={cancelEdit} className="text-emerald-400/60 hover:text-emerald-400">
              <X size={18} />
            </button>
          </div>
          <ItemForm type={type} item={editItem} onChange={setEditItem} />
          <button
            onClick={saveItem}
            disabled={saving}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm hover:bg-emerald-600 disabled:opacity-60"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save Item"}
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-emerald-400/70 text-left">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">ID</th>
              <th className="px-4 py-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={String(item.id)} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-emerald-100">
                  {String(item[displayKey] || item.id)}
                </td>
                <td className="px-4 py-3 text-emerald-400/50 hidden md:table-cell font-mono text-xs">
                  {String(item.id)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(i)}
                      className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-400"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteItem(i)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-emerald-400/50">
                  No items yet. Click &quot;Add New&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-50 text-sm focus:outline-none focus:border-emerald-400/40";
  return (
    <div>
      <label className="block text-xs text-emerald-400/70 mb-1">{label}</label>
      {multiline ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={cls + " resize-y"} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

const FIELD_SCHEMAS: Record<string, { key: string; label: string; multiline?: boolean; array?: boolean }[]> = {
  projects: [
    { key: "id", label: "ID (slug)" },
    { key: "title", label: "Title" },
    { key: "summary", label: "Summary", multiline: true },
    { key: "category", label: "Category (research / technical)" },
    { key: "tags", label: "Tags (comma separated)" },
    { key: "institution", label: "Institution" },
    { key: "date", label: "Date" },
    { key: "guidedBy", label: "Guided By" },
    { key: "description", label: "Description", multiline: true },
    { key: "highlights", label: "Highlights (one per line)", multiline: true, array: true },
    { key: "technologies", label: "Technologies (one per line)", multiline: true, array: true },
    { key: "coverImage", label: "Cover Image URL" },
    { key: "gallery", label: "Gallery Images (one URL per line)", multiline: true, array: true },
    { key: "documentUrl", label: "Document URL" },
  ],
  experience: [
    { key: "id", label: "ID (slug)" },
    { key: "role", label: "Role" },
    { key: "company", label: "Company" },
    { key: "timeline", label: "Timeline" },
    { key: "category", label: "Category (Full-Time / Internship / Fellowship / etc.)" },
    { key: "description", label: "Description (one per line)", multiline: true, array: true },
    { key: "technologies", label: "Technologies (one per line)", multiline: true, array: true },
  ],
  achievements: [
    { key: "id", label: "ID (slug)" },
    { key: "title", label: "Title" },
    { key: "summary", label: "Summary", multiline: true },
    { key: "date", label: "Date" },
    { key: "organization", label: "Organization" },
    { key: "description", label: "Description", multiline: true },
    { key: "highlights", label: "Highlights (one per line)", multiline: true, array: true },
    { key: "documentUrl", label: "Document URL" },
  ],
  education: [
    { key: "id", label: "ID (slug)" },
    { key: "degree", label: "Degree" },
    { key: "institution", label: "Institution" },
    { key: "timeline", label: "Timeline" },
    { key: "grade", label: "Grade" },
    { key: "details", label: "Details", multiline: true },
  ],
  references: [
    { key: "id", label: "ID (slug)" },
    { key: "name", label: "Name" },
    { key: "title", label: "Title" },
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ],
  media: [
    { key: "id", label: "ID (slug)" },
    { key: "title", label: "Title" },
    { key: "src", label: "Cover Image URL" },
    { key: "caption", label: "Caption" },
    { key: "alt", label: "Alt Text" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    { key: "summary", label: "Summary", multiline: true },
    { key: "description", label: "Description", multiline: true },
    { key: "highlights", label: "Highlights (one per line)", multiline: true, array: true },
    { key: "gallery", label: "Extra Images (one URL per line)", multiline: true, array: true },
  ],
};

function ItemForm({
  type,
  item,
  onChange,
}: {
  type: ContentType;
  item: Record<string, unknown>;
  onChange: (item: Record<string, unknown>) => void;
}) {
  const fields = FIELD_SCHEMAS[type] || [];

  const getValue = (key: string, isArray?: boolean): string => {
    const val = item[key];
    if (isArray && Array.isArray(val)) return arrayToLines(val as string[]);
    if (key === "tags" && Array.isArray(val)) return (val as string[]).join(", ");
    return val != null ? String(val) : "";
  };

  const setValue = (key: string, value: string, isArray?: boolean) => {
    let parsed: unknown = value;
    if (isArray) parsed = linesToArray(value);
    else if (key === "tags") parsed = value.split(",").map((t) => t.trim()).filter(Boolean);
    onChange({ ...item, [key]: parsed });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {fields.map(({ key, label, multiline, array }) => {
        const cls =
          "w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-50 text-sm focus:outline-none focus:border-emerald-400/40";
        return (
          <div key={key} className={multiline ? "md:col-span-2" : ""}>
            <label className="block text-xs text-emerald-400/70 mb-1">{label}</label>
            {multiline ? (
              <textarea
                rows={array ? 4 : 3}
                value={getValue(key, array)}
                onChange={(e) => setValue(key, e.target.value, array)}
                className={cls + " resize-y"}
              />
            ) : (
              <input
                type="text"
                value={getValue(key, array)}
                onChange={(e) => setValue(key, e.target.value, array)}
                className={cls}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
