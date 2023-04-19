import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NauczComponent } from './naucz.component';

describe('NauczComponent', () => {
  let component: NauczComponent;
  let fixture: ComponentFixture<NauczComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NauczComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NauczComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
