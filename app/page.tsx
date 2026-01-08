import FeatureCard from "@/components/FeatureCard";
import FocusCarousel from "@/components/FocusCarousel";
import heroContent from "@/data/hero_content.json";
import titleSlidesData from "@/data/title_slides.json";
import { HeroCard } from "@/types/feature-card";
import { TitleSlide } from "@/types/focus-carousel";

export default function Home() {
  return (
    <main className="p-12">
      <div className="flex flex-col justify-center align-middle w-full max-w-6xl mx-auto">
        <div className="m-auto text-center flex flex-col space-y-4 p-2">
          <h1 className="text-4xl font-bold text-center mb-2">
            Imperial Generals: <i>History is Your Battlefield</i>
          </h1>
          <h2 className="text-lg text-center">
            Step into the command tent to plot, negotiate, and rule to define not only your fate, but the shifting tides of history itself.
          </h2>
        </div>
        {(heroContent as HeroCard[]).map((HeroItem, index) => {
          return (
            <FeatureCard
              key={index}
              contentHead={HeroItem.contentHead}
              contentBody={HeroItem.contentBody}
              sideLeft={HeroItem.sideLeft}
              heroImage={{
                src: HeroItem.src,
                width: HeroItem.width,
                height: HeroItem.height,
                alt: HeroItem.alt ? HeroItem.alt : ""
              }}
            />
          )
        })}
        <FocusCarousel titleSlides={titleSlidesData as TitleSlide[]} />
      </div>
    </main>
  );
}
