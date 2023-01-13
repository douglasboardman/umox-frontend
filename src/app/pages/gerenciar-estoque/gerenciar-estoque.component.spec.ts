import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarEstoqueComponent } from './gerenciar-estoque.component';

describe('GerenciarEstoqueComponent', () => {
  let component: GerenciarEstoqueComponent;
  let fixture: ComponentFixture<GerenciarEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarEstoqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
