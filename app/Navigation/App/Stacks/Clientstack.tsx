import { createStackNavigator } from '@react-navigation/stack';
import { CityBuzz, Dashboard, News, Profile, Status } from '../../../Screens';
import { ClientRoutes } from '../../types';

const { Navigator, Screen, Group } = createStackNavigator<ClientRoutes>();

export default function ClientNavigator() {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="Dashboard" component={Dashboard} />
			<Screen name="CityBuzz" component={CityBuzz} />
			<Screen name="News" component={News} />
			<Screen name="Status" component={Status} />
			<Screen name="Profile" component={Profile} />
		</Navigator>
	);
}
