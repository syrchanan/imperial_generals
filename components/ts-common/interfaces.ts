interface NavItem {
    label: string
    path: string
}

interface HeroImage {
    src: string
    width: number
    height: number
    alt?: string
}

interface HeroCard extends HeroImage {
    sideLeft: boolean
    contentHead: string
    contentBody: string
}

interface TitleSlide extends HeroImage {
    subtitle: string,
    era?: string
}