import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X, FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAdminResources, saveAdminResource, deleteAdminResource, downloadResource, type AdminResource } from "@/lib/resources";

const emptyForm = { title: "", description: "", tags: [] as string[], file: null as File | null };

const ResourcesManager = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<AdminResource[]>(getAdminResources);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = () => setResources(getAdminResources());

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file) { toast({ title: "Please select a file", variant: "destructive" }); return; }
    setSaving(true);
    const reader = new FileReader();
    reader.onload = () => {
      const resource: AdminResource = {
        id: Date.now().toString(),
        title: form.title,
        description: form.description,
        tags: form.tags,
        fileName: form.file!.name,
        fileUrl: reader.result as string,
        fileType: form.file!.type,
        createdAt: new Date().toISOString(),
      };
      saveAdminResource(resource);
      refresh();
      setForm(emptyForm);
      setTagInput("");
      setShowForm(false);
      setSaving(false);
      toast({ title: "Resource uploaded" });
    };
    reader.readAsDataURL(form.file);
  };

  const handleDelete = (id: string) => {
    deleteAdminResource(id);
    refresh();
    toast({ title: "Resource deleted" });
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Resources</h1>
        <Button variant="teal" onClick={() => setShowForm(s => !s)}>
          <Plus className="h-4 w-4 mr-1" /> Upload Resource
        </Button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-base font-semibold mb-4">New Resource</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Name *</label>
              <Input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. NDPA 2023 Compliance Checklist" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Description</label>
              <Textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of this resource..." />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-teal/10 text-teal text-xs font-medium px-2 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type a tag and press Enter"
                />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">File *</label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-teal transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                {form.file ? (
                  <p className="text-sm text-foreground font-medium">{form.file.name}</p>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to select a file</p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                onChange={e => setForm(f => ({ ...f, file: e.target.files?.[0] ?? null }))}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="teal" type="submit" disabled={saving}>{saving ? "Uploading..." : "Upload"}</Button>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Resource list */}
      {resources.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No resources uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map(r => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{r.title}</p>
                {r.description && <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{r.description}</p>}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {r.tags.map(tag => (
                    <span key={tag} className="bg-teal/10 text-teal text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{r.fileName}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => downloadResource(r)}>Download</Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesManager;
