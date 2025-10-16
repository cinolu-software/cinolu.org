import { Component, OnDestroy, signal, inject, input, effect } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IEvent } from '../../../../../../shared/models/entities.models';

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.html',
})
export class EventReport implements OnDestroy {
  event = input.required<IEvent>();
  pdfUrl = signal<SafeResourceUrl>('');
  sanitizer = inject(DomSanitizer);

  constructor() {
    effect(() => {
      this.generateReport();
    });
  }

  async generateReport(): Promise<void> {
    const doc = new jsPDF();
    const marginX = 15;
    let y = 20;

    const logoBase64 = await this.toBase64('/images/logo/logo-g.png');
    doc.addImage(logoBase64, 'PNG', marginX, 10, 25, 25);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Centre d’innovation de Lubumbashi (CINOLU)', marginX + 35, 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Rapport d’événement', marginX + 35, 23);
    doc.setFontSize(10);
    doc.text(`Généré le ${new Date().toLocaleString()}`, marginX + 35, 30);

    doc.setFontSize(18);
    doc.text(this.event().name, marginX, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(
      `Du ${new Date(this.event().started_at).toLocaleDateString()} au ${new Date(this.event().ended_at).toLocaleDateString()}`,
      marginX,
      y,
    );
    y += 10;
    const descDiv = document.createElement('div');
    descDiv.innerHTML = (this.event().description || '').replace(/style="[^"]*"/g, '');
    const descLines = doc.splitTextToSize(descDiv.textContent || '', 180);
    doc.text(descLines, marginX, y);
    y += descLines.length * 7;
    doc.setFontSize(12);
    if (this.event().indicators?.length) {
      autoTable(doc, {
        startY: y + 10,
        head: [['Indicateur', 'Valeur']],
        body: this.event().indicators.map((i) => [i.name, i.value]),
      });
    }
    doc.setFontSize(10);
    doc.text(`Généré le ${new Date().toLocaleString()}`, marginX, 180);
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  private async toBase64(url: string): Promise<string> {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  ngOnDestroy(): void {
    if (this.pdfUrl()) URL.revokeObjectURL(this.pdfUrl() as string);
  }
}
