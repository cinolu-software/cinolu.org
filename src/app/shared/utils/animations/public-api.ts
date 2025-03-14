import { expandCollapse } from 'app/shared/utils/animations/expand-collapse';
import {
  fadeIn,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  fadeInStagger,
  fadeInTop,
  fadeOut,
  fadeOutBottom,
  fadeOutLeft,
  fadeOutRight,
  fadeOutTop
} from 'app/shared/utils/animations/fade';
import { shake } from 'app/shared/utils/animations/shake';
import {
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideInTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
  slideOutTop
} from 'app/shared/utils/animations/slide';
import { zoomIn, zoomOut } from 'app/shared/utils/animations/zoom';

export const Animations = [
  expandCollapse,
  fadeIn,
  fadeInTop,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  fadeOut,
  fadeOutTop,
  fadeOutBottom,
  fadeOutLeft,
  fadeOutRight,
  fadeInStagger,
  shake,
  slideInTop,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideOutTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
  zoomIn,
  zoomOut
];
