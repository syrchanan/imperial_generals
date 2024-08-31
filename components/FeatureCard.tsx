import Image from "next/image"

export default function FeatureCard({ sideLeft, contentHead, contentBody, heroImage }: { sideLeft: boolean, contentHead: string, contentBody: string, heroImage: HeroImage }) {

    const hero_side: string = sideLeft ? "flex-row" : "flex-row-reverse"

    return (
        // if left then flex-row else if right then flex-reverse
        <div className={`flex flex-wrap ${hero_side} h-auto bg-opacity-80 bg-secondary rounded-2xl p-4 my-4`}>
            <Image className="w-full sm:w-fit sm:max-w-5/12 px-4 m-auto md:max-w-96 md:max-h-96"
                src={heroImage.src}
                width={heroImage.width}
                height={heroImage.height}
                alt={heroImage.alt ? heroImage.alt : ""}
            />
            <div className="flex flex-col items-center space-y-4 w-full sm:w-7/12 py-8 px-4 m-auto text-pretty">
                <h3 className="w-full text-center text-lg font-serif font-bold">
                    <i>{contentHead}</i>
                </h3>
                <p className="w-full">
                    {contentBody}
                </p>
            </div>
        </div>
    )
}