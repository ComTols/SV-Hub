import {Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
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
    numberOfComments: 4,
    comments: [{
      id: "2345",
      title: "Kommentar",
      aura: 5,
      content: "toll",
      numberOfComments: 4,
      comments: []
    }]
  }

  id: string | null = null;
  subhub: SubHub = {
    id: "",
    title: "4YOU"
  }

  @ViewChild("writeComment", {static: true}) commentTemplate!: TemplateRef<any>

  constructor(
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  onClickComment(event: { element: ElementRef, data: Post }) {

  }
}
