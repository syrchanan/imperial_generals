export interface HeroImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface HeroCard {
  sideLeft: boolean;
  contentHead: string;
  contentBody: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
}
