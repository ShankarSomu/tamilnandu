import { CrabLogo } from "@/components/crab";
import { Icon, IconName } from "@/components/icons";
import { ContactLink } from "@/components/contact-link";
import { WaitlistForm } from "@/components/waitlist-form";
import pkg from "../package.json";

// To use your own image, drop it in /public/images and update this path (e.g. .png or .webp).
const HERO_IMAGE_SRC = "/images/crab-helping.jpg";
const HERO_IMAGE_ALT =
  "A red crab on a ledge reaching down a claw to help a smaller crab climb up.";

const GITHUB_URL = "https://github.com/ShankarSomu/tamilnandu";

const wrap = "mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8";
const eyebrow = "text-xs font-semibold uppercase tracking-widest text-teal";
const h2 = "mt-3 font-serif text-2xl font-bold leading-tight text-charcoal sm:text-4xl";

const purposePoints: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Encouragement", text: "A kind word from someone who gets it." },
  { icon: "link", title: "Introductions", text: "Reach the right person, without needing a contact." },
  { icon: "book", title: "Learning", text: "Share what you know and grow from others." },
  { icon: "bolt", title: "Practical support", text: "Real, hands-on help when it matters." }
];

const participationCards: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "chat",
    title: "Ask for support",
    description:
      "Request practical help, guidance, or introductions when you are blocked or taking on something new."
  },
  {
    icon: "users",
    title: "Share your strengths",
    description:
      "Offer what you know through mentorship, quick advice, referrals, and thoughtful collaboration."
  },
  {
    icon: "sparkles",
    title: "Celebrate others",
    description:
      "Recognize progress and effort so people feel seen, encouraged, and motivated to keep going."
  }
];

const values: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "heart",
    title: "Kindness",
    description: "We center respect and encouragement in every interaction."
  },
  {
    icon: "users",
    title: "Inclusion",
    description: "People across backgrounds, castes, and beliefs belong and are welcome."
  },
  {
    icon: "lock",
    title: "Privacy and consent",
    description: "People choose what to share, and how they are contacted."
  },
  {
    icon: "bolt",
    title: "Helpful action over popularity",
    description: "Impact matters more than status, trends, or social clout."
  }
];

const builderRoles = ["Developers", "Designers", "Writers", "Community builders"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-offwhite text-charcoal">
      <header className="sticky top-0 z-20 border-b border-teal/10 bg-offwhite/90 backdrop-blur">
        <div className={`${wrap} flex items-center justify-between py-3`}>
          <a href="#" className="flex items-center gap-2 text-lg font-bold text-teal no-underline sm:text-xl">
            <CrabLogo className="h-8 w-8 sm:h-9 sm:w-9" />
            TamilNandu
          </a>
          <nav aria-label="Primary" className="flex items-center gap-3 whitespace-nowrap text-sm font-medium sm:gap-6">
            <a href="#purpose" className="text-charcoal">
              Our Purpose
            </a>
            <a
              href="#join-early"
              className="rounded-full bg-teal px-3 py-2 text-white no-underline hover:bg-teal/90 sm:px-4"
            >
              Join Early
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-teal/[0.07] to-offwhite">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber/25 blur-3xl"
          />
          <div className={`${wrap} relative grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-2`}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
                A community taking its first steps
              </p>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                Let&apos;s <span className="text-teal">lift each other</span> up.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/85">
                TamilNandu is a Tamil-rooted global community, open to everyone. We&apos;re creating a
                space to ask for support, share what you know, celebrate progress, and help one
                another move forward.
              </p>
              <p className="mt-5 max-w-xl rounded-xl border-l-4 border-amber bg-white px-4 py-3 text-sm text-charcoal/80 shadow-sm">
                <strong className="font-semibold text-charcoal">Still being built.</strong> The first
                version isn&apos;t live yet. Join the waitlist for updates, or volunteer your skills to
                help build it with us.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#join-early"
                  className="inline-flex items-center justify-center rounded-xl bg-teal px-6 py-3.5 text-sm font-semibold text-white no-underline shadow-sm hover:bg-teal/90"
                >
                  Join the Founding Community
                </a>
                <a
                  href="#purpose"
                  className="inline-flex items-center justify-center rounded-xl border border-teal/25 bg-white px-6 py-3.5 text-sm font-semibold text-teal no-underline hover:bg-teal/5"
                >
                  Explore Our Purpose
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/75">
                {["Tamil-rooted", "Open to everyone", "Consent-based updates"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Icon name="check" className="h-4 w-4 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-amber/40"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE_SRC}
                alt={HERO_IMAGE_ALT}
                width={1200}
                height={896}
                className="relative h-auto w-full rounded-3xl border border-charcoal/10 bg-white shadow-lg"
              />
              <figcaption className="relative mt-5 text-sm italic text-charcoal/75">
                Crabs are said to pull each other back down. We&apos;re building a community where
                they reach down and lift each other up.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="purpose" className={`${wrap} scroll-mt-20 py-20`}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className={eyebrow}>Our Purpose</p>
              <h2 className={h2}>Support should not depend on who you already know.</h2>
              <p className="mt-5 leading-relaxed text-charcoal/85">
                TamilNandu exists to make encouragement, introductions, learning, and practical
                support easier to access. Whether someone needs a nudge, a new connection, or
                hands-on advice, we want helpful people to find each other faster, with trust and
                care.
              </p>
              <p className="mt-4 leading-relaxed text-charcoal/85">
                That could mean getting feedback on a résumé, finding someone to learn from, or
                helping a small business owner connect with someone who has relevant experience.
                These are examples of what we hope to make possible.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {purposePoints.map((point) => (
                <li
                  key={point.title}
                  className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Icon name={point.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-semibold text-charcoal">{point.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/75">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="build" className="scroll-mt-20 bg-teal py-20 text-white">
          <div className={`${wrap} grid gap-10 lg:grid-cols-2 lg:items-center`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">
                Build with us
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                Help us build it, together.
              </h2>
              <p className="mt-5 leading-relaxed text-white/85">
                We&apos;d rather build this with a community than for one. Everyone is welcome,
                whatever your background or experience level.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#join-early"
                  className="inline-flex items-center justify-center rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-charcoal no-underline hover:bg-amber/90"
                >
                  Volunteer to Build
                </a>
                <a
                  href={GITHUB_URL}
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white no-underline hover:bg-white/10"
                >
                  View the Project on GitHub
                </a>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {builderRoles.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-sm font-medium"
                >
                  <Icon name="check" className="h-4 w-4 shrink-0 text-amber" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${wrap} py-20`}>
          <div className="max-w-2xl">
            <p className={eyebrow}>How it will work</p>
            <h2 className={h2}>Three simple ways to take part.</h2>
            <p className="mt-4 inline-flex rounded-full bg-amber/30 px-3 py-1 text-sm font-medium text-charcoal">
              Planned features, not currently live
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {participationCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal text-white">
                    <Icon name={card.icon} />
                  </span>
                  <span className="font-serif text-3xl font-bold text-charcoal/15">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-charcoal">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-charcoal/10 bg-white py-20">
          <div className={wrap}>
            <div className="max-w-2xl">
              <p className={eyebrow}>Our Values</p>
              <h2 className={h2}>Rooted in Tamil. Open to everyone.</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="flex gap-4 rounded-2xl border border-charcoal/10 bg-offwhite p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/40 text-charcoal">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-charcoal">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/80">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="standards" className={`${wrap} scroll-mt-20 py-20`}>
          <div className="flex flex-col gap-5 rounded-3xl border border-amber/60 bg-amber/10 p-6 sm:flex-row sm:gap-6 sm:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-teal shadow-sm">
              <Icon name="shield" className="h-7 w-7" />
            </span>
            <div>
              <h2 className="font-serif text-2xl font-bold leading-tight text-charcoal sm:text-3xl">
                Respect is part of the plan.
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-charcoal/85">
                We&apos;re planning clear community guidelines and a way to report concerns. Reports
                will be reviewed, and responses may include removing content or restricting
                accounts, depending on the seriousness of the issue. Our goal is a respectful place
                to ask for and offer help.
              </p>
            </div>
          </div>
        </section>

        <section id="join-early" className="scroll-mt-20 bg-gradient-to-b from-offwhite to-teal/[0.08] py-20">
          <div className={`${wrap} grid gap-10 lg:grid-cols-5 lg:items-start`}>
            <div className="lg:col-span-2">
              <p className={eyebrow}>Join Early</p>
              <h2 className={h2}>Be part of the founding community.</h2>
              <p className="mt-5 leading-relaxed text-charcoal/85">
                Join our early community to receive occasional updates and invitations to share
                ideas, test the first version, or contribute your skills. You don&apos;t need to be
                technical, and there&apos;s no obligation to volunteer.
              </p>
              <p className="mt-3 leading-relaxed text-charcoal/85">
                Whether you hope to find support or to offer it, you&apos;re equally welcome here.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
                {[
                  "Occasional updates only, never spam",
                  "Your email is used only for TamilNandu updates",
                  "You can opt out at any time"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-charcoal text-white">
        <div className={`${wrap} flex flex-col gap-6 py-10 text-sm md:flex-row md:items-center md:justify-between`}>
          <div>
            <p className="flex items-center gap-2 text-lg font-bold">
              <CrabLogo className="h-8 w-8" />
              TamilNandu
            </p>
            <p className="mt-3 font-medium">Mutual help, shared growth, and meaningful support.</p>
            <p className="text-white/70">
              A community initiative in development. <span className="text-white/50">v{pkg.version}</span>
            </p>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="text-white">
              Privacy
            </a>
            <ContactLink className="text-white">Contact</ContactLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
