import { OwlOptions } from 'ngx-owl-carousel-o';

export const owlOptionsTeam: OwlOptions = {
  mouseDrag: false,
  touchDrag: false,
  loop: true,
  dots: false,
  nav: false,
  responsive: {
    0: {
      items: 1
    },
    740: {
      items: 2
    },
    940: {
      items: 4
    },
    1040: {
      items: 5
    }
  }
};
