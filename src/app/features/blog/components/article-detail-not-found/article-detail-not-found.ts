import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, FileX, ArrowRight, Newspaper, Tag, Search } from 'lucide-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-article-detail-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslateModule, LucideAngularModule, Button],
  templateUrl: './article-detail-not-found.html'
})
export class ArticleDetailNotFoundComponent {
  icons = { fileX: FileX, arrowRight: ArrowRight, newspaper: Newspaper, tag: Tag, search: Search };
}
