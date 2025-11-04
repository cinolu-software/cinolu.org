import { Component, computed, inject } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { HERO_SLIDES, IHeroSlide } from '../../data/hero-slides.data';
import { LucideAngularModule, Sparkles, Calendar, Newspaper, Rocket, FolderKanban } from 'lucide-angular';
import { HeroCard } from './component/hero-card/hero-card';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselPageEvent } from 'primeng/carousel';
import { carouselConfig } from '@features/landing/config/carousel.config';
import { HighlightsStore, HighlightItem } from '../../../highlights/store/highlights.store';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, HeroCard, CommonModule, CarouselModule],
  providers: [HighlightsStore],
  templateUrl: './hero.html'
})
export class Hero {
  private highlightsStore = inject(HighlightsStore);

  stats = STATS;

  slides = computed(() => {
    const highlights = this.highlightsStore.highlights();
    const dynamicSlides = this.mapHighlightsToSlides(highlights);

    return [...HERO_SLIDES, ...dynamicSlides];
  });

  currentBgImage = HERO_SLIDES[0].backgroundImage;
  responsiveOptions = carouselConfig;

  onPageChange(event: CarouselPageEvent): void {
    if (event.page !== undefined) {
      const currentSlides = this.slides();
      this.currentBgImage = currentSlides[event.page]?.backgroundImage || HERO_SLIDES[0].backgroundImage;
    }
  }

  private mapHighlightsToSlides(highlights: HighlightItem[]): IHeroSlide[] {
    return highlights
      .filter((item) => {
        return 'is_highlighted' in item && item.is_highlighted;
      })
      .map((item, index) => this.highlightToSlide(item, index + 1000));
  }

  private highlightToSlide(item: HighlightItem, id: number): IHeroSlide {
    const baseSlide = {
      id,
      backgroundImage: this.getBackgroundImage(item)
    };

    switch (item.sourceKey) {
      case 'programs':
        return {
          ...baseSlide,
          badge: { icon: Sparkles, text: 'Programme phare' },
          title: item.name,
          titleHighlight: 'Rejoignez-nous !',
          description: this.truncateText(item.description, 150),
          primaryCta: { text: 'En savoir plus', link: `/our-programs/${item.slug}` },
          secondaryCta: { text: 'Tous nos programmes', link: '/programs' }
        };

      case 'subprograms':
        return {
          ...baseSlide,
          badge: { icon: Rocket, text: 'Sous-programme' },
          title: item.name,
          titleHighlight: 'Accélérez votre croissance',
          description: this.truncateText(item.description, 150),
          primaryCta: { text: 'Découvrir', link: `/our-programs/subprograms/${item.slug}` },
          secondaryCta: { text: 'Nos programmes', link: '/programs' }
        };

      case 'events':
        return {
          ...baseSlide,
          badge: { icon: Calendar, text: 'Événement à venir' },
          title: item.name,
          titleHighlight: new Date(item.started_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          description: this.truncateText(item.description, 150),
          primaryCta: { text: 'Plus de détails', link: `/events/${item.slug}` },
          secondaryCta: { text: 'Tous les événements', link: '/events' }
        };

      case 'projects':
        return {
          ...baseSlide,
          badge: { icon: FolderKanban, text: 'Projet en vedette' },
          title: item.name,
          titleHighlight: 'Innovation en action',
          description: this.truncateText(item.description, 150),
          primaryCta: { text: 'Voir le projet', link: `/programs/${item.slug}` },
          secondaryCta: { text: 'Tous les projets', link: '/programs' }
        };

      case 'articles':
        return {
          ...baseSlide,
          badge: { icon: Newspaper, text: 'Article récent' },
          title: item.title,
          titleHighlight: 'À lire absolument',
          description: this.truncateText(item.summary || item.content, 150),
          primaryCta: { text: "Lire l'article", link: `/blog-ressources/${item.slug}` },
          secondaryCta: { text: 'Tous les articles', link: '/blog-ressources' }
        };

      default:
        return {
          ...baseSlide,
          badge: { icon: Sparkles, text: 'Découvrez' },
          title: 'Nouveau contenu',
          titleHighlight: 'À découvrir',
          description: 'Découvrez nos dernières actualités',
          primaryCta: { text: 'En savoir plus', link: '/' }
        };
    }
  }

  private getBackgroundImage(item: HighlightItem): string {
    const imageType = this.whatIsDisplayed(item);
    const apiUrl = environment.apiUrl;

    if (imageType === 'program' && 'logo' in item && item.logo) {
      return `${apiUrl}uploads/programs/${item.logo}`;
    }
    if (imageType === 'subprogram' && 'logo' in item && item.logo) {
      return `${apiUrl}uploads/subprograms/${item.logo}`;
    }
    if (imageType === 'event' && 'cover' in item && item.cover) {
      return `${apiUrl}uploads/events/${item.cover}`;
    }
    if (imageType === 'project' && 'cover' in item && item.cover) {
      return `${apiUrl}uploads/projects/${item.cover}`;
    }
    if (imageType === 'article' && 'image' in item && item.image) {
      return `${apiUrl}uploads/articles/${item.image}`;
    }

    const defaultImages: Record<string, string> = {
      programs: '/images/hero.jpg',
      subprograms: '/images/innovation.jpg',
      events: '/images/hero.jpg',
      projects: '/images/innovation.jpg',
      articles: '/images/hero.jpg'
    };

    return defaultImages[item.sourceKey] || '/images/hero.jpg';
  }

  private whatIsDisplayed(element: HighlightItem): string {
    switch (element.sourceKey) {
      case 'programs':
        return 'program';
      case 'subprograms':
        return 'subprogram';
      case 'events':
        return 'event';
      case 'projects':
        return 'project';
      case 'articles':
        return 'article';
      default:
        return 'cover';
    }
  }

  private truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return 'Découvrez cette nouveauté sur notre plateforme.';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
