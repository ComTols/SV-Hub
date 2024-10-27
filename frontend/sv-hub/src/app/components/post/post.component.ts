import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  @Input() data: Post | null = null
  @Input() commentsOpen: boolean = false

  @Output() clickComment = new EventEmitter()
  @Output() clickUpvote = new EventEmitter()
  @Output() clickDownvote = new EventEmitter()
  @Output() clickReport = new EventEmitter()
  @Output() clickRepost = new EventEmitter()

  constructor(protected elementRef: ElementRef) {
  }

  onClickComment() {
    this.clickComment.emit({element: this.elementRef, data: this.data})

    this.commentsOpen = !this.commentsOpen
  }

}
