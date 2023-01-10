import { Component, Input } from '@angular/core';
import { setBreadcrumbs } from 'src/models/Breadcrumb';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() tituloPagina!: string;
  breadcrumbs!: any;

  ngOnInit() {
    this.breadcrumbs = setBreadcrumbs(this.tituloPagina);
  }
}
