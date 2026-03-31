import { useState, useEffect } from "react";
import { PlusCircle, Trash2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getEvents, createEvent, updateEvent, deleteEvent, type EventItem } from "@/lib/events";

const empty = (): Omit<EventItem, "id" | "created_at"> => ({
  name: "",
  date: "",
  venue: "",
  description: "",
  register_link: "",
});

const EventsManager = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(empty());
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      setEvents(await getEvents());
    } catch {
      toast({ title: "Failed to load events", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date.trim() || !form.venue.trim()) {
      toast({ title: "Missing fields", description: "Name, date and venue are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateEvent(editingId, form);
        toast({ title: "Event updated" });
      } else {
        await createEvent(form);
        toast({ title: "Event created" });
      }
      setForm(empty());
      setEditingId(null);
      await load();
    } catch (err: any) {
      toast({ title: "Failed to save event", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (ev: EventItem) => {
    setForm({
      name: ev.name,
      date: ev.date,
      venue: ev.venue,
      description: ev.description,
      register_link: ev.register_link,
    });
    setEditingId(ev.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      toast({ title: "Event deleted" });
      if (editingId === id) { setForm(empty()); setEditingId(null); }
      await load();
    } catch (err: any) {
      toast({ title: "Failed to delete event", description: err.message, variant: "destructive" });
    }
  };

  const handleCancel = () => {
    setForm(empty());
    setEditingId(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <CalendarDays className="h-6 w-6 text-teal" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events Manager</h1>
          <p className="text-sm text-muted-foreground">Create and manage upcoming events shown on the Events & News page.</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-foreground mb-5">
          {editingId ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Event Name *</label>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Data Protection Compliance Summit 2026" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Date *</label>
              <Input name="date" value={form.date} onChange={handleChange} placeholder="e.g. 15 October 2026 or To be announced" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Venue *</label>
              <Input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. Lagos, Nigeria" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Registration Link</label>
              <Input name="register_link" value={form.register_link} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Brief Description</label>
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="A short description of the event..." rows={3} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="teal" className="flex items-center gap-2" disabled={saving}>
              <PlusCircle className="h-4 w-4" />
              {saving ? "Saving..." : editingId ? "Update Event" : "Add Event"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
            )}
          </div>
        </form>
      </div>

      {/* Events list */}
      <h2 className="font-semibold text-foreground mb-4">Existing Events ({events.length})</h2>
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-muted-foreground text-sm">No events created yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((ev) => (
            <div key={ev.id} className="bg-card border border-border rounded-xl p-5 flex flex-wrap gap-4 items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{ev.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  📅 {ev.date} &nbsp;·&nbsp; 📍 {ev.venue}
                </p>
                {ev.description && <p className="text-sm text-muted-foreground line-clamp-2">{ev.description}</p>}
                {ev.register_link && (
                  <a href={ev.register_link} target="_blank" rel="noopener noreferrer" className="text-xs text-teal mt-1 inline-block truncate max-w-xs">
                    {ev.register_link}
                  </a>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => handleEdit(ev)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(ev.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsManager;
