import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGeneratorComponent } from './modal-generator.component';

describe('ModalGeneratorComponent', () => {
  let component: ModalGeneratorComponent;
  let fixture: ComponentFixture<ModalGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
