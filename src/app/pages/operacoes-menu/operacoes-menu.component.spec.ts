import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesMenuComponent } from './operacoes-menu.component';

describe('OperacoesMenuComponent', () => {
  let component: OperacoesMenuComponent;
  let fixture: ComponentFixture<OperacoesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacoesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacoesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
