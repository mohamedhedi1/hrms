import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-agenda-component',
  templateUrl: './agenda-component.component.html',
  styleUrls: ['./agenda-component.component.css']
})
export class AgendaComponentComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    initialDate: new Date(), // Définit la date initiale comme étant la date actuelle
    selectable: true, // Permettre la sélection de dates
    select: (arg: DateSelectArg) => this.handleDateSelect(arg), // Gérer la sélection de dates avec le type DateSelectArg
    events: [ // Ajoutez les événements des jours fériés ici
      {
        title: 'Nouvel An',
        start: '2024-01-01', // Lundi 1er janvier 2024 : Nouvel An
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Fête de l’Indépendance de la Tunisie',
        start: '2024-03-20', // Mercredi 20 mars 2024 : Fête de l’Indépendance de la Tunisie
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Jour des Martyrs',
        start: '2024-04-09', // Mardi 9 avril 2024 : Jour des Martyrs
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Congés Aïd El Fitr',
        start: '2024-04-09', // Mardi 9 avril 2024 : Congés Aïd El Fitr
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Fête du Travail',
        start: '2024-05-01', // Mercredi 1er mai 2024 : Fête du Travail
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Aïd El Idha',
        start: '2024-06-16', // Dimanche 16 Juin 2024 : Aïd El Idha
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Jour de l’An Hégire',
        start: '2024-07-08', // Lundi 8 juillet 2024 : Jour de l’An Hégire
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Fête de la République',
        start: '2024-07-25', // Jeudi 25 juillet 2024 : Fête de la République
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Fête de la femme',
        start: '2024-08-13', // Mardi 13 août 2024 : Fête de la femme
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Al Mawlid',
        start: '2024-09-16', // Lundi 16 septembre 2024 : Al Mawlid
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Fête de l’évacuation',
        start: '2024-10-15', // Mardi 15 octobre 2024 : Fête de l’évacuation
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
      {
        title: 'Fête de la Révolution',
        start: '2024-12-17', // Mardi 17 décembre 2024 : Fête de la Révolution
        classNames: ['holiday'] // Classe CSS pour personnaliser le style du jour férié
      },
    ],
    // Autres options du calendrier
  };

  handleDateSelect(arg: DateSelectArg) {
    console.log('Selected date:', arg.start);
    // Ajouter le code pour gérer la date sélectionnée ici
  }
}
