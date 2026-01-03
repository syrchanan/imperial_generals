import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

export default function FocusCarousel({ titleSlides }: { titleSlides: { src: string; height: number; width: number; alt?: string; subtitle: string; era?: string }[] }) {
    return (
        <div className="flex flex-col bg-opacity-80 bg-secondary rounded-2xl p-4 my-4">
            <h3 className="text-center text-lg font-serif p-4 font-bold">
                <i>Explore the Eras We&apos;ve Played</i>
            </h3>
            <Carousel opts={{ loop: true }} className="w-full md:w-4/6 lg:w-3/6 xl:w-2/6 mx-auto">
                <CarouselContent>
                    {titleSlides.map((TitleSlide, index) => (
                        <CarouselItem key={index} className="basis-full m-auto h-80 flex flex-col justify-center items-center">
                            <Image
                                className="m-auto py-8 object-contain h-60 w-auto"
                                style={{ objectFit: 'contain' }} // contain to resize instead of cover
                                src={TitleSlide.src}
                                width={TitleSlide.width}
                                height={TitleSlide.height}
                                alt={TitleSlide.alt ? TitleSlide.alt : ""}
                            />
                            <p className="text-center text-lg">{TitleSlide.subtitle}</p>
                            <p className="text-center text-base">{TitleSlide.era ? TitleSlide.era : ""}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
