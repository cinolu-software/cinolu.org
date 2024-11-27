import { Component } from '@angular/core';

@Component({
    selector: 'app-problem-statement',
    imports: [],
    templateUrl: './problem-statement.component.html'
})
export class ProblemStatementComponent {
  innovationEcosystems: { title: string; description: string }[] = [
    {
      title: 'Écosystème non structuré et non cartographié',
      description: "L'écosystème d'innovation est encore désorganisé et n'a pas été clairement défini ou cartographié."
    },
    {
      title: "Manque d'organisations spécialisées de soutien à l'innovation (ISO)",
      description:
        "Il y a un manque d'organisations spécialisées pour la génération et le développement d'idées. Les rares incubateurs, accélérateurs, espaces de coworking et centres de transfert technologique existants sont encore à leurs débuts."
    },
    {
      title: "Faible connaissance de l'entrepreneuriat structuré",
      description:
        "Il existe une faible compréhension de l'entrepreneuriat structuré par discipline et du fonctionnement d'un écosystème startup."
    },
    {
      title: 'Manque de cadre politique et réglementaire',
      description:
        "Il n'existe pas de cadre politique et réglementaire adéquat pour soutenir l'innovation et l'entrepreneuriat axé sur l'innovation. Le premier StartupAct a été introduit en 2022."
    },
    {
      title: "Absence d'un réseau structuré d'écosystèmes",
      description: "Il manque un réseau structuré reliant les différentes parties de l'écosystème d'innovation."
    }
  ];
}
