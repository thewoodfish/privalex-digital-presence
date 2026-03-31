import { supabase } from "./supabase";

export interface GalleryPhoto {
  id: string;
  photo_url: string;
  description: string;
  date: string;
  created_at?: string;
}

const BUCKET = "gallery";

export async function getPhotos(): Promise<GalleryPhoto[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function uploadPhoto(
  file: File,
  description: string,
  date: string
): Promise<void> {
  const path = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type });
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  const { error: insertError } = await supabase.from("gallery").insert({
    photo_url: urlData.publicUrl,
    description,
    date,
  });
  if (insertError) throw insertError;
}

export async function deletePhoto(id: string, photo_url: string): Promise<void> {
  const path = photo_url.split(`/${BUCKET}/`)[1];
  if (path) await supabase.storage.from(BUCKET).remove([path]);
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
}
