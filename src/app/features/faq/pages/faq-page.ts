import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, ChevronDown, Mail, Phone, MessageCircle } from 'lucide-angular';
import { FAQItem } from '@shared/models';
import { FaqPageSkeleton } from '../components/faq-page-skeleton/faq-page-skeleton';

@Component({
  selector: 'app-faq',
  imports: [CommonModule, TranslateModule, LucideAngularModule, FaqPageSkeleton],
  templateUrl: './faq-page.html'
})
export class FaqPage {
  icons = { chevronDown: ChevronDown, mail: Mail, phone: Phone, messageCircle: MessageCircle };
  selectedCategory = signal<'all' | 'general' | 'programs' | 'events' | 'entrepreneurs' | 'technical'>('all');

  categories: { key: 'all' | 'general' | 'programs' | 'events' | 'entrepreneurs' | 'technical'; label: string }[] = [
    { key: 'all', label: 'Toutes' },
    { key: 'general', label: 'Général' },
    { key: 'programs', label: 'Programmes' },
    { key: 'events', label: 'Événements' },
    { key: 'entrepreneurs', label: 'Entrepreneurs' },
    { key: 'technical', label: 'Technique' }
  ];

  loading = signal(true);

  faqItems: FAQItem[] = [
    {
      question: 'Le site cinolu.org est-il gratuit ?',
      answer:
        "Oui, l'accès au site et à ses contenus est totalement gratuit. Certains programmes peuvent avoir des frais de participation, mais cela est clairement indiqué dans leurs descriptions.",
      category: 'general'
    },
    {
      question: 'Dois-je créer un compte pour utiliser le site ?',
      answer:
        'Non, vous pouvez naviguer et consulter tous les contenus sans créer de compte. Un compte sera nécessaire uniquement si vous postulez à certains programmes ou événements.',
      category: 'general'
    },
    {
      question: 'Le site est-il disponible en plusieurs langues ?',
      answer:
        'Oui, le site est disponible en Français et en Anglais. Vous pouvez changer de langue à tout moment via le sélecteur en haut à droite.',
      category: 'general'
    },
    {
      question: 'Comment puis-je être informé des nouveautés ?',
      answer:
        'Inscrivez-vous à la newsletter en bas de page et suivez Cinolu sur les réseaux sociaux (Facebook, LinkedIn, Instagram, Twitter).',
      category: 'general'
    },

    {
      question: 'Comment puis-je postuler à un programme ?',
      answer:
        'Consultez la page "Programmes", sélectionnez celui qui vous intéresse, lisez les critères d\'éligibilité et cliquez sur "Postuler" ou contactez Cinolu via le formulaire de contact.',
      category: 'programs'
    },
    {
      question: 'Les programmes sont-ils réservés aux habitants de Lubumbashi ?',
      answer:
        "La plupart des programmes sont ouverts aux entrepreneurs de toute la RDC et parfois d'autres pays africains. Consultez les critères d'éligibilité de chaque programme.",
      category: 'programs'
    },
    {
      question: "Combien de temps dure l'accompagnement ?",
      answer:
        'La durée varie selon le type de programme : de quelques jours (formations intensives) à plusieurs mois (incubation/accélération). Les détails sont précisés dans chaque programme.',
      category: 'programs'
    },
    {
      question: 'Cinolu finance-t-il les projets ?',
      answer:
        'Cinolu accompagne principalement par le renforcement de capacités, le mentorat et la mise en réseau. Certains programmes peuvent inclure des subventions ou connecter les entrepreneurs à des investisseurs. Consultez les détails de chaque programme.',
      category: 'programs'
    },

    {
      question: "Comment m'inscrire à un événement ?",
      answer:
        'Allez sur la page "Événements", cliquez sur l\'événement qui vous intéresse, puis cliquez sur "Postuler Maintenant" et remplissez le formulaire.',
      category: 'events'
    },
    {
      question: 'Les événements sont-ils payants ?',
      answer:
        "La plupart des événements organisés par Cinolu sont gratuits. Si des frais sont requis, cela sera clairement indiqué dans la description de l'événement.",
      category: 'events'
    },
    {
      question: 'Puis-je participer en ligne ou les événements sont-ils uniquement en présentiel ?',
      answer:
        "Cela dépend de l'événement. Les détails (présentiel, en ligne ou hybride) sont précisés dans chaque description d'événement.",
      category: 'events'
    },
    {
      question: 'Comment puis-je ajouter un événement à mon calendrier Google ?',
      answer:
        'Sur la page de l\'événement, cliquez sur "Ajouter au calendrier", puis sélectionnez "Google Calendar". L\'événement sera ajouté automatiquement.',
      category: 'events'
    },

    {
      question: 'Comment puis-je figurer dans la section "Nos entrepreneurs" ?',
      answer:
        "Vous devez être accompagné par Cinolu dans le cadre d'un de ses programmes. Contactez Cinolu pour discuter des opportunités d'accompagnement.",
      category: 'entrepreneurs'
    },
    {
      question: 'Puis-je contacter directement les entrepreneurs affichés ?',
      answer:
        'Certains profils affichent un site web ou des coordonnées. Sinon, vous pouvez contacter Cinolu qui facilitera la mise en relation si appropriée.',
      category: 'entrepreneurs'
    },

    {
      question: 'Le site est-il accessible sur mobile ?',
      answer:
        "Oui, le site cinolu.org est entièrement responsive et s'adapte à tous les appareils (smartphone, tablette, ordinateur).",
      category: 'technical'
    },
    {
      question: "J'ai oublié mon mot de passe, que faire ?",
      answer:
        'Si vous avez créé un compte, utilisez la fonctionnalité "Mot de passe oublié" sur la page de connexion. Un lien de réinitialisation vous sera envoyé par email.',
      category: 'technical'
    },
    {
      question: "Le site ne s'affiche pas correctement, que faire ?",
      answer:
        'Essayez de rafraîchir la page (Ctrl+F5), videz le cache de votre navigateur, ou utilisez un autre navigateur (Chrome, Firefox, Safari). Si le problème persiste, contactez le support.',
      category: 'technical'
    },
    {
      question: 'Puis-je télécharger des ressources depuis le site ?',
      answer:
        'Certains articles du blog peuvent inclure des ressources téléchargeables. Recherchez les liens de téléchargement dans les contenus.',
      category: 'technical'
    }
  ];

  filteredFAQ = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.faqItems;
    }
    return this.faqItems.filter((item) => item.category === category);
  });

  toggleFAQ(item: FAQItem) {
    item.open = !item.open;
  }

  constructor() {
    setTimeout(() => this.loading.set(false), 350);
  }
}
