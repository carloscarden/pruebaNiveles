import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MercadopagoPage } from './mercadopago.page';

const routes: Routes = [
  {
    path: '',
    component: MercadopagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercadopagoPageRoutingModule {}
