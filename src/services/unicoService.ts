import { instance, } from '../config/unicoConfig';
import qs from 'qs';
const unicoConfig = instance;

const GenerateToken = async () => {
    const data = qs.stringify({
        'username': 'dev.reserva@unicosistemas.com.br',
        'password': 'i3YpaQZHUX',
        'grant_type': 'password'
    });
    const response = await unicoConfig.post(`/token`, data);
    return response;
};

const FetchCredit = async (customerDocument: string) => {
    const { data } = await GenerateToken();
    const response = await unicoConfig.get(`/api/Credit/GetCreditBalance?customerDocument=${customerDocument}&storeCode=TLVLM`, {
        headers: {
            'Authorization': `Bearer ${data.access_token}`
        }
    });
    return response;
};

export {
    GenerateToken,
    FetchCredit
};

