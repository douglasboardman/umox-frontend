import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContentComponent } from './components/content/content.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AppFrameComponent } from './components/app-frame/app-frame.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WebReqInterceptorService } from './services/web-req-interceptor.service';
import { ConsultarEstoqueComponent } from './pages/consultar-estoque/consultar-estoque.component';
import { NovoPedidoComponent } from './pages/novo-pedido/novo-pedido.component';
import { ModalGeneratorComponent } from './components/modal-generator/modal-generator.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ContentComponent,
    LoginPageComponent,
    TopbarComponent,
    RegisterPageComponent,
    AppFrameComponent,
    NotificationComponent,
    ConsultarEstoqueComponent,
    NovoPedidoComponent,
    ModalGeneratorComponent,
    MeusPedidosComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
