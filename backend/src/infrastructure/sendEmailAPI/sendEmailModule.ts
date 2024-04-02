import { Resend } from 'resend';
import { OrderModule } from '../orders/type';

export class SendEmail {
  public email: string;
  public status: string | undefined;
  constructor(email: string) {
    this.email = email;
  }

  public async sendOrderCreationEmail(orderData: OrderModule.Order) {
    const resend = new Resend('re_dKSL8rRQ_Prv7pPo3e7uUbjRXuaU685ao');
    return resend.emails.send({
      from: 'lopezbogazdaniel@shopping-tracking-project.com',
      to: `${this.email}`,
      subject: `Order: ${orderData._id}`,
      html: `<div>
      <p>${orderData.products}</p>
      <p>${orderData.total_price}</p>
      <p>${orderData.status}</p>
      </div>`,
    });
  }

  public async sendOrderChangedStatusEmail(
    orderData: OrderModule.Order,
    status: string
  ) {
    const resend = new Resend('re_dKSL8rRQ_Prv7pPo3e7uUbjRXuaU685ao');
    return resend.emails.send({
      from: 'lopezbogazdaniel@shopping-tracking-project.com',
      to: `${this.email}`,
      subject: `Order ${orderData._id} has a new status`,
      html: `<div>
      <p>New Status: ${status}</p>
      </div>`,
    });
  }
}
