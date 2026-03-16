import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-3">{children}</p>
);

const DPIAScreeningTool = () => (
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
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-teal" />
          </div>
          <SectionLabel>Free Compliance Tool</SectionLabel>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl text-balance animate-fade-in-up">
          DPIA Threshold Screening Tool
        </h1>
        <p className="text-xl text-white/65 max-w-3xl leading-relaxed animate-fade-in-up animation-delay-200">
          Determine whether your processing activity requires a Data Protection Impact Assessment
          (DPIA) under applicable law. This interactive screening tool covers 31 jurisdictions
          including UK GDPR, EU GDPR, Nigeria NDPA 2023 / GAID 2025, 12 US state and federal
          frameworks, and 16 African data protection laws.
        </p>
        <div className="flex flex-wrap gap-2 mt-8">
          {["UK GDPR", "EU GDPR", "Nigeria NDPA 2023", "GAID 2025", "12 US Frameworks", "16 African Laws"].map((badge) => (
            <span key={badge} className="bg-white/10 text-white/75 text-xs font-medium px-3 py-1 rounded-full border border-white/15">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Tool Embed Area */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-light-grey rounded-2xl border border-border p-12 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            The interactive screening tool will be embedded here once the HTML/JS/CSS package is
            delivered. The tool will be self-contained and fully functional within this page.
          </p>
          <p className="text-muted-foreground text-sm">
            For urgent DPIA threshold queries, please{" "}
            <Link to="/contact" className="text-teal hover:underline">
              contact our team directly
            </Link>
            .
          </p>
        </div>
      </div>
    </section>

    {/* About DPIA */}
    <section className="py-20 bg-light-grey">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionLabel>About This Tool</SectionLabel>
        <h2 className="font-display text-3xl font-bold text-foreground mb-6">
          How the screening tool works
        </h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            A Data Protection Impact Assessment (DPIA) is a structured process used to identify
            and minimise the data protection risks of a project or processing activity. Under many
            data protection laws — including the UK GDPR, EU GDPR, and Nigeria NDPA 2023 — a DPIA
            is legally required in certain circumstances.
          </p>
          <p>
            This tool applies the threshold criteria set out in applicable law and regulatory
            guidance across 31 jurisdictions to give you an indicative answer: does your processing
            activity trigger a mandatory DPIA obligation?
          </p>
          <p>
            The tool is designed to take under five minutes to complete. The output is indicative
            only and does not constitute legal advice. For a definitive assessment, please speak
            to a member of our Data Protection team.
          </p>
        </div>
        <div className="mt-10">
          <Button variant="teal" size="lg" asChild>
            <Link to="/services/data-protection" className="group">
              Speak to Our Data Protection Team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default DPIAScreeningTool;
