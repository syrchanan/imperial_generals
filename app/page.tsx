import FeatureCard from "@/components/FeatureCard";

const HeroContent: HeroCard[] = [
  {
    sideLeft: true,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et feugiat nisi, in sagittis eros. In et sodales libero. Nulla a elit nunc. Cras volutpat est in sem aliquet, id blandit turpis consequat",
    src: "./eagle.svg",
    width: 50,
    height: 50
  },
  {
    sideLeft: false,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et feugiat nisi, in sagittis eros. In et sodales libero. Nulla a elit nunc. Cras volutpat est in sem aliquet, id blandit turpis consequat",
    src: "./eagle.svg",
    width: 50,
    height: 50
  }
]

export default function Home() {
  return (
    <main className="p-12">
      <div className="flex flex-col justify-center align-middle w-4/5 mx-auto">
        {HeroContent.map((HeroItem: HeroCard, index: number) => {
          return (
            <FeatureCard
              key={index}
              content={HeroItem.content}
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
      </div>
    </main>
  );
}
