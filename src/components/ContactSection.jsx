import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

// Set VITE_CONTACT_ENDPOINT (e.g. a Formspree or Web3Forms URL) to receive
// submissions directly. Without it the form opens the visitor's mail client
// with the message pre-filled, so it never silently drops a message.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

const details = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phoneDisplay,
    href: `tel:${profile.phoneHref}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: null,
  },
];

const inputClasses =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setIsSubmitting(true);

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        toast({
          title: "Message sent",
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
        form.reset();
      } else {
        const subject = encodeURIComponent(
          `Portfolio enquiry from ${data.name}`
        );
        const body = encodeURIComponent(
          `${data.message}\n\n— ${data.name} (${data.email})`
        );
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

        toast({
          title: "Opening your mail app",
          description: `Your message to ${profile.email} is ready to send.`,
        });
      }
    } catch (error) {
      toast({
        title: "Couldn't send that",
        description: `Please email me directly at ${profile.email}.`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-secondary/40 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get In"
          accent="Touch"
          description="I'm looking for an IT internship in software or web development. If you're hiring — or just want to talk shop — I'd love to hear from you."
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal className="space-y-8 text-left">
            <h3 className="text-2xl font-semibold">Contact Information</h3>

            <ul className="space-y-6">
              {details.map((detail) => (
                <li key={detail.label} className="flex items-start gap-4">
                  <span className="rounded-full bg-primary/10 p-3">
                    <detail.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h4 className="font-medium">{detail.label}</h4>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <h4 className="mb-4 font-medium">Connect With Me</h4>
              <SocialLinks />
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-xl border border-border bg-card p-6 text-left sm:p-8"
          >
            <h3 className="mb-6 text-2xl font-semibold">Send a Message</h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={inputClasses}
                  placeholder="Juan dela Cruz"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={inputClasses}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={cn(inputClasses, "resize-none")}
                  placeholder="Hi Adrielle, we have an internship opening…"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
