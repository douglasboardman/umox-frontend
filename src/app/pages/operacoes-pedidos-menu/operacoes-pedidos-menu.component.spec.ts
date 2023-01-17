import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesPedidosMenuComponent } from './operacoes-pedidos-menu.component';

describe('OperacoesPedidosMenuComponent', () => {
  let component: OperacoesPedidosMenuComponent;
  let fixture: ComponentFixture<OperacoesPedidosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacoesPedidosMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacoesPedidosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
