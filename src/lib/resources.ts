const KEY = "privalex_resources";

export interface AdminResource {
  id: string;
  title: string;
  description: string;
  tags: string[];
  fileName: string;
  fileUrl: string; // base64 data URL
  fileType: string;
  createdAt: string;
}

export function getAdminResources(): AdminResource[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveAdminResource(resource: AdminResource): void {
  const existing = getAdminResources();
  localStorage.setItem(KEY, JSON.stringify([resource, ...existing]));
}

export function deleteAdminResource(id: string): void {
  const existing = getAdminResources();
  localStorage.setItem(KEY, JSON.stringify(existing.filter(r => r.id !== id)));
}

export function downloadResource(resource: AdminResource): void {
  const a = document.createElement("a");
  a.href = resource.fileUrl;
  a.download = resource.fileName;
  a.click();
}
