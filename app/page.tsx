import FeatureCard from "@/components/FeatureCard";
import FocusCarousel from "@/components/FocusCarousel";

const HeroContent: HeroCard[] = [
  {
    sideLeft: true,
    contentHead: "Forge Your Nation's Destiny",
    contentBody: "As the leader of a burgeoning nation, you'll have the power to shape its destiny. Issue strategic commands to mobilize your armies, fortify your borders, and expand your territory. Whether you're a seasoned strategist or a history buff, the strategic-level map will allow you to immerse yourself in the intricacies of nation-building and warfare.",
    src: "/strategic_map.png",
    width: 1146,
    height: 789
  },
  {
    sideLeft: false,
    contentHead: "Conquer the Battlefield",
    contentBody: "Command your troops with precision in epic battles! As the commander-in-chief, you'll have the power to dictate the fate of every soldier on the battlefield. From flanking maneuvers to coordinated assaults, your tactical decisions will determine the outcome of conflicts. With a variety of units and formations at your disposal, you'll have the freedom to devise unique strategies and outwit your enemies.",
    src: "/tactical_map.png",
    width: 3100,
    height: 1700
  },
  {
    sideLeft: true,
    contentHead: "Master the Art of Diplomacy",
    contentBody: "As the leader of your nation, you'll navigate the complex web of international relations. Forge alliances, negotiate treaties, and manipulate public opinion to achieve your strategic goals. From peaceful diplomacy to calculated aggression, your decisions will influence the balance of power and shape the course of history.",
    src: "/sequoyah.png",
    width: 814,
    height: 1300
  }
]

const TitleSlides: TitleSlide[] = [
  {
    src: "/eagle.svg",
    height: 300,
    width: 300,
    alt: "Napoleonic Eagle",
    subtitle: "Wars of the Coalition",
    era: "1802 - 1815"
  },
  {
    src: "/civil_war.jpg",
    height: 543,
    width: 952,
    alt: "69th PVI Regiment",
    subtitle: "American Civil War",
    era: "1861 - 1865"
  },
  {
    src: "/punic_war.jpg",
    height: 960 * .8,
    width: 1145 * .8,
    alt: "Siege of Carthage",
    subtitle: "Second Punic War",
    era: "218 - 201 BC"
  },
  {
    src: "/ww1_africa.jpg",
    height: 576,
    width: 792,
    alt: "African Theater Regiment",
    subtitle: "WW1 East African Theater",
    era: "1914 - 1918"
  }
]

export default function Home() {
  return (
    <main className="p-12">
      <div className="flex flex-col justify-center align-middle w-4/5 mx-auto">
        <div className="m-auto text-center flex flex-col space-y-4 p-2">
          <h1 className="text-4xl font-bold">Welcome to Imperial Generals!</h1>
          <h2 className="text-lg">A community-based historical RPG where
            <i> you </i>
            decide to follow history, or change it as you play.</h2>
        </div>
        {HeroContent.map((HeroItem: HeroCard, index: number) => {
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
        <FocusCarousel titleSlides={TitleSlides} />
      </div>
    </main>
  );
}
