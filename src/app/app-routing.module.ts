import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './pages/admin-menu/admin-menu.component';
import { AdminPedidosMenuComponent } from './pages/admin-pedidos-menu/admin-pedidos-menu.component';
import { AtenderPedidoComponent } from './pages/atender-pedido/atender-pedido.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';
import { CadastrarItemComponent } from './pages/cadastrar-item/cadastrar-item.component';
import { ConsultarEstoqueComponent } from './pages/consultar-estoque/consultar-estoque.component';
import { ConsultarPedidosComponent } from './pages/consultar-pedidos/consultar-pedidos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditarItemComponent } from './pages/editar-item/editar-item.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { GerenciarEstoqueComponent } from './pages/gerenciar-estoque/gerenciar-estoque.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
import { NovoPedidoComponent } from './pages/novo-pedido/novo-pedido.component';
import { OperacoesMenuComponent } from './pages/operacoes-menu/operacoes-menu.component';
import { OperacoesPedidosMenuComponent } from './pages/operacoes-pedidos-menu/operacoes-pedidos-menu.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { GerenciarUsuariosComponent } from './pages/gerenciar-usuarios/gerenciar-usuarios.component';
import { MeuCadastroComponent } from './pages/meu-cadastro/meu-cadastro.component';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'operacoes/itens/consultarEstoque', component: ConsultarEstoqueComponent},
  { path: 'operacoes/itens', redirectTo: 'operacoes/itens/consultarEstoque', pathMatch: 'full'},
  { path: 'operacoes/pedidos/novoPedido', component: NovoPedidoComponent},
  { path: 'operacoes/pedidos/meusPedidos', component: MeusPedidosComponent},
  { path: 'operacoes/pedidos/consultarPedidos', component: ConsultarPedidosComponent},
  { path: 'admin/pedidos/atendimento', component: AtendimentoComponent},
  { path: 'admin/pedidos/atenderPedido/:pid', component: AtenderPedidoComponent},
  { path: 'admin/itens/gerenciarEstoque', component: GerenciarEstoqueComponent},
  { path: 'admin/itens/editarItem/:id', component: EditarItemComponent},
  { path: 'admin/itens/cadastrarItem', component: CadastrarItemComponent},
  { path: 'operacoes', component: OperacoesMenuComponent},
  { path: 'admin', component: AdminMenuComponent},
  { path: 'operacoes/pedidos', component: OperacoesPedidosMenuComponent},
  { path: 'admin/pedidos', component: AdminPedidosMenuComponent},
  { path: 'admin/usuarios', component: GerenciarUsuariosComponent},
  { path: 'admin/usuarios/editarUsuario/:uid', component: EditarUsuarioComponent},
  { path: 'meuCadastro', component: MeuCadastroComponent},
  { path: 'alterarSenha/:token', component: AlterarSenhaComponent},
  { path: 'recuperarSenha', component: RecuperarSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
