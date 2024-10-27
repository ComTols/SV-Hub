import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscribePage } from './transcribe.page';

describe('TranscribePage', () => {
  let component: TranscribePage;
  let fixture: ComponentFixture<TranscribePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
