import { IDto } from '../interfaces/IDto';

export class MasterDataSendDataDto implements IDto {
  email: string;
  name: string;
  orderId: string;
  phone: string;

  constructor(email: string, name: string, phone: string, orderId: string) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.orderId = orderId;
  }

  formatPhone(phone: string) {
    return `+55${phone.replace(/[^0-9]/gi, '')}`;
  }

  toJson() {
    return {
      email: this.email,
      name: this.name,
      orderId: this.orderId,
      phone: this.formatPhone(this.phone),
    }
  }
}

