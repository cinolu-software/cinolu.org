import { OwlOptions } from 'ngx-owl-carousel-o';

export const owlOptionsRecent: OwlOptions = {
  mouseDrag: false,
  touchDrag: false,
  loop: true,
  dots: false,
  nav: false,
  margin: 15,
  responsive: {
    0: {
      items: 1
    },
    740: {
      items: 2
    },
    940: {
      items: 3
    },
    1040: {
      items: 4
    }
  }
};
