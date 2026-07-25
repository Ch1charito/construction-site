import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarriereComponent } from './karriere.component';

describe('KarriereComponent', () => {
  let component: KarriereComponent;
  let fixture: ComponentFixture<KarriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KarriereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
