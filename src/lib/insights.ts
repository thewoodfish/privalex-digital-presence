import { supabase } from "./supabase";

export interface Insight {
  id: string;
  title: string;
  slug: string;
  author: string;
  tag?: string;
  body: string;
  published_at: string;
  created_at?: string;
}

export const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function getInsights(): Promise<Insight[]> {
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function createInsight(
  insight: Omit<Insight, "id" | "created_at">
): Promise<void> {
  const { error } = await supabase.from("insights").insert(insight);
  if (error) throw error;
}

export async function updateInsight(
  id: string,
  insight: Omit<Insight, "id" | "created_at">
): Promise<void> {
  const { error } = await supabase.from("insights").update(insight).eq("id", id);
  if (error) throw error;
}

export async function deleteInsight(id: string): Promise<void> {
  const { error } = await supabase.from("insights").delete().eq("id", id);
  if (error) throw error;
}
