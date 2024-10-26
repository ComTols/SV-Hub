import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chad',
  templateUrl: './chad.page.html',
  styleUrls: ['./chad.page.scss'],
})
export class ChadPage implements OnInit {

  data: Post = {
    id: "1234",
    content: "## Hallo Welt\n\nIch bin ein **MD**. Toll oder? \n```txt\nund ich bin code\n```",
    aura: 5,
    title: "Sachen machen",
    numberOfComments: 4
  }

  id: string | null = null;
  subhub: SubHub = {
    id: "",
    title: "4YOU"
  }

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }

}
