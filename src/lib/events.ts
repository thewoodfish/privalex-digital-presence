import { supabase } from "./supabase";

export interface EventItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  register_link: string;
  created_at?: string;
}

export async function getEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createEvent(
  event: Omit<EventItem, "id" | "created_at">
): Promise<void> {
  const { error } = await supabase.from("events").insert(event);
  if (error) throw error;
}

export async function updateEvent(
  id: string,
  event: Omit<EventItem, "id" | "created_at">
): Promise<void> {
  const { error } = await supabase.from("events").update(event).eq("id", id);
  if (error) throw error;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}
