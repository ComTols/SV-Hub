import {Component} from '@angular/core';
import "src/app/services/structs"
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public settings = [
    {title: 'Nachrichten', url: '/messages', icon: 'mail'},
    {title: 'Account', url: '/settings/account', icon: 'person-circle'},
    {title: 'Einstellungen', url: '/settings/settings', icon: 'settings'},
    {title: 'Verlauf', url: '/settings/history', icon: 'archive'},
    {title: 'Transkript', url: '/transcribe', icon: 'pencil'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public hubs: HubSpace[] = [
    {
      title: "Space",
      hubs: [
        {
          id: "1234",
          title: "SubHub Eins"
        }

      ]
    }
  ]

  constructor(public router: Router) {
    console.log(router.url)
  }
}
