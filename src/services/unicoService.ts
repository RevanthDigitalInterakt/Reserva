import { instance, } from '../config/unicoConfig';
import qs from 'qs';
const unicoConfig = instance;

const GenerateToken = async () => {
    const dataUser = qs.stringify({
        'username': 'dev.reserva@unicosistemas.com.br',
        'password': 'i3YpaQZHUX',
        'grant_type': 'password'
    });
    const response = await unicoConfig.post(`/token`, dataUser);
    return response;
};

const FetchCredit = async (customerDocument: string) => {
    const { data } = await GenerateToken();
    const response = await unicoConfig.get(`/api/Credit/GetCreditBalance?customerDocument=${customerDocument}&storeCode=TSCR06`, {
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

