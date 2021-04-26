import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button } from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import ItemList from '../Components/ItemList';

export const MenuProfile: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<Box flex={1}>
			<TopBarBackButton />

			<Box alignContent={"flex-start"} pt={'xs'} paddingX={'xxxs'}>
				<Box mb={'micro'} alignSelf={"flex-start"}>
					<Typography fontFamily="reservaSerifRegular" fontSize={20}>Perfil</Typography>
				</Box>
				<Typography fontFamily="reservaSerifRegular" fontSize={16}>Bem-vindo, João.</Typography>

				<Box mt={'xxxs'}>
					<ItemList 
						title={"Meus pedidos"}
						descr={"Acompanhe seus pedidos"}
						icon={"Handbag"} 
					/>

					<ItemList 
						title={"Favoritos"}
						descr={"Veja os produtos que você curtiu"}
						icon={"Heart"} 
					/>

					<ItemList 
						title={"Meus dados"}
						descr={"Visualize e edite suas informações"}
						icon={"Profile"} 
					/>

					<ItemList 
						title={"Meus cartões"}
						descr={"Consulte e adicione cartões de crédito"}
					/>

					<ItemList 
						title={"Meus endereços"}
						descr={"Consulte e adicione seus endereços"}
						icon={"Pin"} 
					/>

					<ItemList 
						title={"Alterar senha"}
						descr={"Altere a senha da sua conta"}
					/>

					<ItemList 
						title={"Notificações"}
						descr={"Mantenha-se informado sobre as novidades"}
					/>
				</Box>
			</Box>		
		</Box>
	);
};
