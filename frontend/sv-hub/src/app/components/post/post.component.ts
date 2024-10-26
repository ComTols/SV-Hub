import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  @Input() data: Post | null = null

  @Output() clickComment = new EventEmitter()
  @Output() clickUpvote = new EventEmitter()
  @Output() clickDownvote = new EventEmitter()
  @Output() clickReport = new EventEmitter()
  @Output() clickRepost = new EventEmitter()

  constructor() {
  }

}
