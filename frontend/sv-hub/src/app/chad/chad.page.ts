import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chad',
  templateUrl: './chad.page.html',
  styleUrls: ['./chad.page.scss'],
})
export class ChadPage {

  data: Post = {
    id: "1234",
    content: "## Hallo Welt\n\nIch bin ein **MD**. Toll oder? \n```txt\nund ich bin code\n```",
    aura: 5,
    title: "Sachen machen",
    numberOfComments: 4
  }

  constructor() {
  }

}
