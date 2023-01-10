import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarEstoqueComponent } from './pages/consultar-estoque/consultar-estoque.component';
import { ConsultarPedidosComponent } from './pages/consultar-pedidos/consultar-pedidos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
import { NovoPedidoComponent } from './pages/novo-pedido/novo-pedido.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'operacoes/itens/consultarEstoque', component: ConsultarEstoqueComponent},
  { path: 'operacoes/pedidos/novoPedido', component: NovoPedidoComponent},
  { path: 'operacoes/pedidos/meusPedidos', component: MeusPedidosComponent},
  { path: 'operacoes/pedidos/consultarPedidos', component: ConsultarPedidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
