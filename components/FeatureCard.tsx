import Image from "next/image"

export default function FeatureCard({ sideLeft, content, heroImage }: { sideLeft: boolean, content: string, heroImage: HeroImage }) {

    const hero_side: string = sideLeft ? "flex-row" : "flex-row-reverse"

    return (
        // if left then flex-row else if right then flex-reverse
        <div className={`flex flex-wrap ${hero_side} h-auto bg-opacity-80 bg-secondary rounded-2xl p-4 my-4`}>
            <Image className="w-full sm:w-2/6 sm:max-h-60 p-4 m-auto"
                src={heroImage.src}
                width={heroImage.width}
                height={heroImage.height}
                alt={heroImage.alt ? heroImage.alt : ""}
            />
            <p className="w-full sm:w-4/6 p-8 m-auto font-bold">
                {content}
            </p>
        </div>
    )
}