import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { config } from "@/lib/birthday-config";
import { Particles, Twinkles } from "@/components/birthday/Particles";
import { GiftBox } from "@/components/birthday/GiftBox";
import { Hero } from "@/components/birthday/Hero";
import { Cake } from "@/components/birthday/Cake";
import { Gallery } from "@/components/birthday/Gallery";
import { Letters } from "@/components/birthday/Letters";
import { Wish } from "@/components/birthday/Wish";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { QRSection } from "@/components/birthday/QRSection";
import { YouTubePlayer } from "@/components/birthday/YouTubePlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday Surprise — For Someone Extraordinary" },
      { name: "description", content: "A handcrafted, cinematic birthday gift — letters, memories, wishes, and one last surprise." },
      { property: "og:title", content: "A Birthday Surprise" },
      { property: "og:description", content: "Open your gift. A cinematic, luxury birthday experience." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Tajawal:wght@300;400;500;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Twinkles />
      <Particles />

      {!opened && (
        <GiftBox tagline={config.opening.tagline} cta={config.opening.cta} onOpen={() => setOpened(true)} />
      )}

      {opened && (
        <div className="relative z-10">
          <Hero title={config.hero.title} subtitle={config.hero.subtitle} body={config.hero.body} portrait={config.portrait} />
          <Cake messages={config.cake} />
          <Gallery title={config.gallerySection.title} subtitle={config.gallerySection.subtitle} photos={config.gallery} />
          <Letters letters={config.letters} />
          <Wish lines={config.wish} />
          <FinalSurprise {...config.final} />
          <QRSection url={config.websiteUrl} />
          <footer className="py-12 text-center text-pearl/40 text-xs uppercase tracking-[0.4em]">
            Made with love {config.friendName}
          </footer>
          <YouTubePlayer videoId={config.youtubeId} />
        </div>
      )}
    </main>
  );
}
