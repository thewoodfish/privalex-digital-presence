import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, Newspaper } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-3">{children}</p>
);

const upcomingEvents = [
  {
    name: "Data Protection Compliance Summit 2025",
    date: "To be announced",
    location: "Lagos, Nigeria",
    description:
      "PrivaLex Advisory's flagship annual compliance summit bringing together data protection officers, legal practitioners, and regulators across Nigeria and West Africa.",
    cta: "Register Interest",
    ctaHref: "/contact",
  },
];

const pastEvents: { name: string; date: string; summary: string }[] = [];

const newsItems: { title: string; date: string; excerpt: string }[] = [];

const EventsNews = () => {
  const eventsRef = useScrollReveal();
  const newsRef = useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
          <SectionLabel>Events & News</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl text-balance animate-fade-in-up">
            Events & News
          </h1>
          <p className="text-xl text-white/65 max-w-3xl leading-relaxed animate-fade-in-up animation-delay-200">
            Stay informed on upcoming PrivaLex Advisory events, regulatory developments, firm
            announcements, and thought leadership from our team.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-28 bg-background">
        <div
          ref={eventsRef.ref}
          className={`container mx-auto px-4 transition-all duration-700 ${eventsRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <SectionLabel>Upcoming Events</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            Forthcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {upcomingEvents.map((event, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal rounded-t-xl" />
                  <div className="flex flex-wrap gap-4 items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-3">{event.name}</h3>
                      <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-teal" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-teal" />
                          {event.location}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                    <Button variant="teal" size="sm" asChild className="flex-shrink-0">
                      <Link to={event.ctaHref}>
                        {event.cta} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No upcoming events at this time. Please check back soon.</p>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-light-grey">
        <div className="container mx-auto px-4">
          <SectionLabel>Past Events</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            Event Archive
          </h2>
          {pastEvents.length > 0 ? (
            <div className="space-y-4">
              {pastEvents.map((event, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-1">{event.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Past event details will appear here.</p>
          )}
        </div>
      </section>

      {/* Event Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionLabel>Event Gallery</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground mb-12">
            Post-event photography from PrivaLex Advisory events and engagements.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-full bg-light-grey rounded-xl p-16 text-center border border-dashed border-border">
              <p className="text-muted-foreground text-sm">
                Event photos will be uploaded here following each event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-20 bg-light-grey">
        <div
          ref={newsRef.ref}
          className={`container mx-auto px-4 transition-all duration-700 ${newsRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <SectionLabel>News & Announcements</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            Firm News
          </h2>
          {newsItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {newsItems.map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal rounded-t-xl" />
                  <div className="flex items-center gap-2 mb-3">
                    <Newspaper className="h-4 w-4 text-teal" />
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                  <span className="text-teal text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">News and announcements will appear here.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
            Stay Connected
          </h2>
          <p className="text-white/65 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            To receive updates about upcoming events, regulatory news, and firm announcements,
            contact us or follow us on LinkedIn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="teal" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsNews;
