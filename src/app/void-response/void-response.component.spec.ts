import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidResponseComponent } from './void-response.component';

describe('VoidResponseComponent', () => {
  let component: VoidResponseComponent;
  let fixture: ComponentFixture<VoidResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoidResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
