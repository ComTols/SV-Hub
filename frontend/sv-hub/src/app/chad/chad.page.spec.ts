import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChadPage } from './chad.page';

describe('ChadPage', () => {
  let component: ChadPage;
  let fixture: ComponentFixture<ChadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
