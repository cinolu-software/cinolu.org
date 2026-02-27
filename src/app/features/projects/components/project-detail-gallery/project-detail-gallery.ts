import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import type { IProject } from '@shared/models/entities.models';

@Component({
  selector: 'app-project-detail-gallery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GalleriaModule, ApiImgPipe],
  templateUrl: './project-detail-gallery.html'
})
export class ProjectDetailGalleryComponent {
  project = input.required<IProject>();

  responsiveOptions = [
    { breakpoint: '1280px', numVisible: 3, numScroll: 1 },
    { breakpoint: '800px', numVisible: 2, numScroll: 1 },
    { breakpoint: '640px', numVisible: 1, numScroll: 1 }
  ];
}
