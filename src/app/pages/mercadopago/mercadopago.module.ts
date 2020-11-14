import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MercadopagoPageRoutingModule } from './mercadopago-routing.module';

import { MercadopagoPage } from './mercadopago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MercadopagoPageRoutingModule
  ],
  declarations: [MercadopagoPage]
})
export class MercadopagoPageModule {}
