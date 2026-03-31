import { useState, useEffect, useRef } from "react";
import { ImagePlus, Trash2, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getPhotos, uploadPhoto, deletePhoto, type GalleryPhoto } from "@/lib/gallery";

const GalleryManager = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      setPhotos(await getPhotos());
    } catch {
      toast({ title: "Failed to load photos", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Please select a photo", variant: "destructive" });
      return;
    }
    if (!date) {
      toast({ title: "Please enter a date", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await uploadPhoto(file, description, date);
      toast({ title: "Photo uploaded" });
      setFile(null);
      setPreview(null);
      setDescription("");
      setDate("");
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    try {
      await deletePhoto(photo.id, photo.photo_url);
      toast({ title: "Photo deleted" });
      await load();
    } catch (err: any) {
      toast({ title: "Failed to delete", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Images className="h-6 w-6 text-teal" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gallery Manager</h1>
          <p className="text-sm text-muted-foreground">Upload event photos displayed in the gallery on the Events & News page.</p>
        </div>
      </div>

      {/* Upload form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-foreground mb-5">Upload New Photo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File picker */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Photo *</label>
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-teal transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                  <p className="text-sm">Click to select a photo</p>
                  <p className="text-xs">JPG, PNG, WebP supported</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Date *</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Data Protection Summit 2026 — Opening ceremony"
              />
            </div>
          </div>

          <Button type="submit" variant="teal" className="flex items-center gap-2" disabled={saving}>
            <ImagePlus className="h-4 w-4" />
            {saving ? "Uploading..." : "Upload Photo"}
          </Button>
        </form>
      </div>

      {/* Photo grid */}
      <h2 className="font-semibold text-foreground mb-4">Uploaded Photos ({photos.length})</h2>
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading photos...</p>
      ) : photos.length === 0 ? (
        <p className="text-muted-foreground text-sm">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative rounded-xl overflow-hidden border border-border bg-card">
              <img
                src={photo.photo_url}
                alt={photo.description}
                className="w-full h-44 object-cover"
              />
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">{photo.date}</p>
                {photo.description && (
                  <p className="text-sm text-foreground line-clamp-2">{photo.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(photo)}
                className="absolute top-2 right-2 bg-destructive text-white rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete photo"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
