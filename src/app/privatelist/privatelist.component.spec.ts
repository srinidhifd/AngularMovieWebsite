import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatelistComponent } from './privatelist.component';

describe('PrivatelistComponent', () => {
  let component: PrivatelistComponent;
  let fixture: ComponentFixture<PrivatelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivatelistComponent]
    });
    fixture = TestBed.createComponent(PrivatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
