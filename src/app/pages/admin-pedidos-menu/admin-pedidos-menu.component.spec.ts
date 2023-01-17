import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPedidosMenuComponent } from './admin-pedidos-menu.component';

describe('AdminPedidosMenuComponent', () => {
  let component: AdminPedidosMenuComponent;
  let fixture: ComponentFixture<AdminPedidosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPedidosMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPedidosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
