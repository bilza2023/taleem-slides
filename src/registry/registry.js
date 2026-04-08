// src/registry.js

//--content 
import { TitleAndSubtitleSlide } from "../slideTemplates/TitleAndSubtitleSlide.js";
import { TitleAndParaSlide } from "../slideTemplates/TitleAndParaSlide.js";
import { BulletListSlide } from "../slideTemplates/BulletListSlide.js";
import { TwoColumnTextSlide } from "../slideTemplates/TwoColumnTextSlide.js";
//--image
import { ImageSlide } from "../slideTemplates/ImageSlide.js";
import { FillImageSlide } from "../slideTemplates/FillImageSlide.js";
import { ImageWithTitleSlide } from "../slideTemplates/ImageWithTitleSlide.js";
import { ImageWithCaptionSlide } from "../slideTemplates/ImageWithCaptionSlide.js";
import { ImageLeftBulletsRightSlide } from "../slideTemplates/ImageLeftBulletsRightSlide.js";
import { ImageRightBulletsLeftSlide } from "../slideTemplates/ImageRightBulletsLeftSlide.js";
//--table
import { TableSlide } from "../slideTemplates/TableSlide.js";
//--side slides/ charts
import { BarChartSlide } from "../slideTemplates/BarChartSlide.js";
import { Progressbar } from "../slideTemplates/Progressbar.js";
import { QuoteSlide } from "../slideTemplates/QuoteSlide.js";
import { KeyIdeasSlide } from "../slideTemplates/KeyIdeasSlide.js";
import { FocusListSlide } from "../slideTemplates/FocusList.js";
import { ImageStripSlide } from "../slideTemplates/ImagesStrip.js";
import { ImageGridSlide } from "../slideTemplates/ImageGrid.js";
import { TextGridSlide } from "../slideTemplates/TextGrid.js";

//--player-only
import { SkeletonSlide } from "../slideTemplates/SkeletonSlide.js";
import { EqSlide } from "../slideTemplates/EqSlide.js";

export const SlideRegistry = {
  titleAndSubtitle: TitleAndSubtitleSlide,
  titleAndPara: TitleAndParaSlide,
  bulletList: BulletListSlide,
  twoColumnText: TwoColumnTextSlide,

  imageSlide: ImageSlide,
  fillImage: FillImageSlide,
  imageWithTitle: ImageWithTitleSlide,
  imageWithCaption: ImageWithCaptionSlide,
  imageLeftBulletsRight: ImageLeftBulletsRightSlide,
  imageRightBulletsLeft: ImageRightBulletsLeftSlide,

  table: TableSlide,
  barChart: BarChartSlide,
  progressbar: Progressbar,

  quoteSlide: QuoteSlide,
  keyIdeasSlide: KeyIdeasSlide,

  eq: EqSlide,
  skeleton: SkeletonSlide,
  focusList: FocusListSlide,
  imageStrip: ImageStripSlide,
  imageGrid: ImageGridSlide,
  textGrid: TextGridSlide,
};
