import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import confetti from "canvas-confetti";
import { BlossomRain } from "@/components/BlossomRain";
import { RunawayButton } from "@/components/RunawayButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [yes, setYes] = useState(false);

  const celebrate = () => {
    setYes(true);
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        particleCount: Math.floor(220 * particleRatio),
        colors: ["#e8a3b0", "#c2415a", "#f7e6d8", "#8b1e2d", "#ffffff"],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <BlossomRain />

      <div className="relative z-10">
        {/* Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="animate-fade-in">
            <p className="font-serif italic text-crimson text-lg tracking-widest uppercase">
              For Rufaro
            </p>
            <Divider />
          </div>
          <h1 className="animate-fade-in-up font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ animationDelay: "0.4s" }}>
            Rufaro, I have a<br />
            <span className="italic text-crimson">question</span> for you…
          </h1>
          <p className="mt-8 animate-fade-in font-sans text-sm text-muted-foreground tracking-[0.3em] uppercase"
             style={{ animationDelay: "1.2s" }}>
            scroll gently ↓
          </p>
        </section>

        {/* The Ask */}
        <section className="flex items-center justify-center px-6 py-24">
          <div className="max-w-2xl rounded-sm border border-border/60 bg-card/80 px-8 py-14 text-center shadow-2xl backdrop-blur-sm md:px-16 md:py-20">
            <div className="mb-2 font-serif italic text-crimson">a small note</div>
            <Divider />
            <p className="mt-6 font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              Rufaro, I'd love to take you to <span className="italic text-crimson">Miyako</span> — a beautiful sushi restaurant I think you'd enjoy.
            </p>
            <p className="mt-6 font-serif text-xl leading-relaxed text-foreground/80 md:text-2xl">
              Great food, a lovely atmosphere, and even better company. Just you and me.
            </p>
            <p className="mt-8 font-serif text-2xl italic text-crimson md:text-3xl">
              Would you give me that chance?
            </p>
          </div>
        </section>

        {/* About Miyako */}
        <section className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md overflow-hidden rounded-sm border border-border bg-card shadow-xl">
            <div className="border-b border-border bg-ink px-6 py-3 text-center">
              <p className="font-serif text-xs tracking-[0.4em] text-background uppercase">
                Restaurant
              </p>
            </div>
            <div className="px-8 py-10 text-center">
              <h3 className="font-serif text-4xl font-semibold text-crimson">Miyako Sushi</h3>
              <p className="mt-1 font-serif italic text-muted-foreground">宮古</p>
              <Divider />
              <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/80">
                A stunning Japanese restaurant known for its fresh sushi and intimate, cosy atmosphere.
              </p>
              <dl className="mt-8 space-y-4 text-left">
                <Detail label="Date" value="Saturday, 16 May" />
                <Detail label="Time" value="7:00 PM" />
              </dl>
            </div>
          </div>
        </section>

        {/* The Ask buttons */}
        <section className="flex flex-col items-center justify-center gap-6 px-6 py-20">
          {!yes && (
            <p className="font-serif text-2xl italic text-ink">So… what do you say?</p>
          )}

          {yes ? (
            <div className="animate-fade-in-up max-w-xl rounded-sm border border-crimson/30 bg-card px-10 py-12 text-center shadow-2xl">
              <p className="font-serif text-3xl text-crimson md:text-4xl">
                Yes!! Rufaro, you just made my day 🍣🌸
              </p>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <button
                onClick={celebrate}
                className="rounded-full bg-crimson px-10 py-5 font-serif text-xl text-primary-foreground shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
              >
                ✅ Yes, I'd love that!
              </button>
              <RunawayButton />
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 text-center">
          <Divider />
          <p className="mt-4 font-serif italic text-muted-foreground">
            Made with 🌸 and a little courage, just for Rufaro
          </p>
        </footer>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto mt-3 flex items-center justify-center gap-3 text-crimson/70">
      <span className="h-px w-12 bg-crimson/40" />
      <span className="text-xs">✿</span>
      <span className="h-px w-12 bg-crimson/40" />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-2">
      <dt className="font-serif text-xs tracking-[0.25em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="font-serif text-base text-ink">{value}</dd>
    </div>
  );
}
