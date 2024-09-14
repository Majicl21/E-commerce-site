import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurappComponent } from './ourapp.component';

describe('OurappComponent', () => {
  let component: OurappComponent;
  let fixture: ComponentFixture<OurappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
