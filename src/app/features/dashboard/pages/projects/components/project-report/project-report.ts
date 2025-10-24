import { Component, OnDestroy, signal, inject, input, effect } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IProject } from '../../../../../../shared/models/entities.models';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.html',
})
export class ProjectReport implements OnDestroy {
  project = input.required<IProject>();
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
    doc.text('Rapport du projet', marginX + 35, 23);
    doc.setFontSize(10);
    doc.text(`Généré le ${new Date().toLocaleString()}`, marginX + 35, 30);
    y = 60;

    doc.setFontSize(18);
    doc.text(this.project().name, marginX, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(
      `Du ${new Date(this.project().started_at).toLocaleDateString()} au ${new Date(this.project().ended_at).toLocaleDateString()}`,
      marginX,
      y,
    );
    y += 10;
    const descDiv = document.createElement('div');
    descDiv.innerHTML = (this.project().description || '').replace(/style="[^"]*"/g, '');
    const descLines = doc.splitTextToSize(descDiv.textContent || '', 180);
    doc.text(descLines, marginX, y);
    y += descLines.length * 5;
    doc.setFontSize(12);
    if (this.project().metrics?.length) {
      autoTable(doc, {
        startY: y + 10,
        head: [['Indicateur', 'Attendu', 'Obtenu']],
        body: this.project().metrics.map((i) => [i.indicator.name, i.target, i.achieved]),
      });
    }
    doc.setFontSize(10);
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
