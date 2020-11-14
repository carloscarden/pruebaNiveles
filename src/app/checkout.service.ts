import { Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class CheckoutService {



  // Agrega credenciales


  constructor() {

  }

  caca() {
    console.log('caca');

  }


 /* goCheckOut(products) {
    return this.mercadopago.preferences.create(products).then(response => {
      // Este es el checkout generado o link al que nos vamos a posicionar para pagar
      console.log(response);
      return { response };
    }).catch(error => {
      console.log(error);
      return error;
    });
  }*/
}
