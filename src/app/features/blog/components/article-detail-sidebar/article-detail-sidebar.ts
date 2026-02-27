import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GalleriaModule } from 'primeng/galleria';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import type { IArticle, IImage } from '@shared/models/entities.models';

@Component({
  selector: 'app-article-detail-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, DatePipe, TitleCasePipe, TranslateModule, GalleriaModule, ApiImgPipe],
  templateUrl: './article-detail-sidebar.html'
})
export class ArticleDetailSidebarComponent {
  articles = input.required<IArticle[]>();
  gallery = input<IImage[]>([]);

  responsiveOptions = [
    { breakpoint: '1280px', numVisible: 3, numScroll: 1 },
    { breakpoint: '800px', numVisible: 2, numScroll: 1 },
    { breakpoint: '640px', numVisible: 1, numScroll: 1 }
  ];
}
