import type { VideoId } from "./types";

export interface VideoSource {
  title: string;
  /** Вставьте публичный URL Kinescope: iframe/embed или прямой mp4/hls URL. */
  url: string;
  poster?: string;
}

export const VIDEO_CONFIG: Record<VideoId, VideoSource> = {
  breath360: {
    title: "Дыхание 360°",
    url: "https://kinescope.io/embed/5NJec2jFdYwDAB84GVQky1",
  },
  pelvicTilt: {
    title: "Наклон таза",
    url: "https://kinescope.io/embed/hVsTCh4JKmQqW7xdyY1inm",
  },
  overheadSquat: {
    title: "Присед с руками вверх",
    url: "https://kinescope.io/embed/hUBHHSvwZBmp89K2Eybpgd",
  },
  ankleWall: {
    title: "Колено к стене",
    url: "https://kinescope.io/embed/chD1wZgjD9y4R2KuL5HUcn",
  },
  wallArms: {
    title: "Руки вверх у стены",
    url: "https://kinescope.io/embed/42fDXncyB2sUbdoEvHPECw",
  },
  singleLeg: {
    title: "Стойка на одной ноге",
    url: "https://kinescope.io/embed/gKRqqb3Z7cStYEixywiJTU",
  },
};
