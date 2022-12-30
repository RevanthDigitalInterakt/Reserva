import { MasterDataSendDataDto } from "./masterdata-send-data.dto";

describe('MasterDataSendDataDtoTest', () => {
  const dto = new MasterDataSendDataDto('email@email.com', 'name', '(11) 95590-5195', '123456');

  it('should create class and generate the correct json', () => {
    const model = dto.toJson();

    expect(JSON.stringify(model)).toBe(JSON.stringify({
      email: 'email@email.com',
      name: 'name',
      orderId: '123456',
      phone: '+5511955905195',
    }));
  })

  it('should format the phone number', () => {
    const phone = dto.formatPhone('(11) 95590-5195');

    expect(phone).toBe('+5511955905195');
  })
})
