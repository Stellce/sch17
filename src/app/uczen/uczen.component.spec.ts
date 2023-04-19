import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UczenComponent } from './uczen.component';

describe('UczenComponent', () => {
  let component: UczenComponent;
  let fixture: ComponentFixture<UczenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UczenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UczenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
