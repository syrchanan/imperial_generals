import Image from "next/image"

export default function FeatureCard({ sideLeft, contentHead, contentBody, heroImage }: { sideLeft: boolean, contentHead: string, contentBody: string, heroImage: HeroImage }) {
    // Responsive flex direction: vertical on mobile/sm, horizontal on md+
    const flexDirection = sideLeft ? 'md:flex-row' : 'md:flex-row-reverse';
    return (
        <div className={`flex flex-col ${flexDirection} bg-opacity-80 bg-secondary rounded-2xl p-4 my-4 h-auto min-h-80`}>
            <Image
                className="w-full md:w-5/12 px-4 m-auto object-contain h-48 md:h-64 lg:h-80"
                src={heroImage.src}
                width={heroImage.width}
                height={heroImage.height}
                alt={heroImage.alt ? heroImage.alt : ""}
                style={{ objectFit: 'contain' }}
            />
            <div className="flex flex-col items-center space-y-4 w-full md:w-7/12 py-8 px-4 m-auto text-pretty">
                <h3 className="w-full text-center text-lg font-serif font-bold">
                    <i>{contentHead}</i>
                </h3>
                <p className="w-full">{contentBody}</p>
            </div>
        </div>
    )
}
