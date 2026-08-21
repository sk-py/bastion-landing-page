import { ScrollProgress } from "@/components/scroll-progress";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Audience } from "@/components/sections/audience";
import { Features } from "@/components/sections/features";
import { Security } from "@/components/sections/security";
import { Stack } from "@/components/sections/stack";
import { GetStarted } from "@/components/sections/get-started";
import { Roadmap } from "@/components/sections/roadmap";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Problem />
      <Audience />
      <Features />
      <Security />
      <Stack />
      <GetStarted />
      <Roadmap />
      <Cta />
      <Footer />
    </main>
  );
}
