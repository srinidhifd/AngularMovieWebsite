import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliclistComponent } from './publiclist.component';

describe('PubliclistComponent', () => {
  let component: PubliclistComponent;
  let fixture: ComponentFixture<PubliclistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubliclistComponent]
    });
    fixture = TestBed.createComponent(PubliclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
