import { Component, Inject, OnInit } from '@angular/core';
import { get } from 'scriptjs';
import { CheckoutService } from 'src/app/checkout.service';
import { DOCUMENT } from '@angular/common';

declare var Mercadopago;


@Component({
  selector: 'app-mercadopago',
  templateUrl: './mercadopago.page.html',
  styleUrls: ['./mercadopago.page.scss'],
})
export class MercadopagoPage implements OnInit {


  doSubmit = true;


  preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };

  // tslint:disable-next-line: variable-name
  init_point: any;



  constructor(
    @Inject(DOCUMENT) document,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    Mercadopago.setPublishableKey('APP_USR-e2bfd5f8-48b9-4551-880c-c022f752168d');
    Mercadopago.getIdentificationTypes();
  }

  guessPaymentMethod(event) {
    this.cleanCardInfo();
    const cardnumber = (document.getElementById('cardNumber') as HTMLInputElement).value;
    if (cardnumber.length >= 6) {
      const bin = cardnumber.substring(0, 6);
      console.log(bin);
      Mercadopago.getPaymentMethod({
        bin
      }, this.setPaymentMethod);
    }
  }


  setPaymentMethod(status, response) {
    if (status === 200) {
      const paymentMethod = response[0];

      (document.getElementById('paymentMethodId') as HTMLInputElement).value = paymentMethod.id;
      document.getElementById('cardNumber').style.backgroundImage = 'url(' + paymentMethod.thumbnail + ')';

      if (paymentMethod.additional_info_needed.includes('issuer_id')) {
        this.getIssuers(paymentMethod.id);

      } else {
        document.getElementById('issuerInput').classList.add('hidden');


      }

    } else {
      alert(`payment method info error: ${response}`);
    }
  }

  getIssuers(paymentMethodId) {
    Mercadopago.getIssuers(
      paymentMethodId,
      this.setIssuers
    );
  }

  setIssuers(status, response) {
    if (status === 200) {
      const issuerSelect = document.getElementById('issuer');

      response.forEach(issuer => {
        const opt = document.createElement('option');
        opt.text = issuer.name;
        opt.value = issuer.id;
        issuerSelect.appendChild(opt);
      });

    } else {
      alert(`issuers method info error: ${response}`);
    }
  }



  cleanCardInfo() {
    document.getElementById('cardNumber').style.backgroundImage = '';
    document.getElementById('issuerInput').classList.add('hidden');
    (document.getElementById('issuer') as HTMLSelectElement).options.length = 0;
  }

  getCardToken(event) {
    event.preventDefault();
    if (!this.doSubmit) {
      const $form = document.getElementById('paymentForm');
      Mercadopago.createToken($form, this.setCardTokenAndPay);

      return false;
    }
  }

  setCardTokenAndPay(status, response) {
    if (status === 200 || status === 201) {
      const form = document.getElementById('paymentForm');
      const card = document.createElement('input');
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'text');
      card.setAttribute('value', response.id);
      form.appendChild(card);
      this.doSubmit = true;
      alert(response.id);
      // form.submit(); //Submit form data to your backend
    } else {
      alert('Verify filled data!\n' + JSON.stringify(response, null, 4));
    }
  }


  onBuy() {

  }





}
