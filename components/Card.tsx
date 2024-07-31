import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../app/Navigation';
import { useStackNavigationProp } from '../app/Navigation/types/types';
import { Icons } from '../assets/Icons';
import { Text } from './Text';
import colors from '../constants/Colors';

interface CardProp {
	light?: boolean;
	location?: string;
	duration?: string;
	faulty?: boolean;
	lastSeen?: string;
	press?: () => void;
}

const LightCard = ({
	light,
	press,
	location,
	faulty,
	duration,
	lastSeen,
}: CardProp) => {
	return (
		<TouchableOpacity onPress={press}>
			<View style={styles.container}>
				<View>
					<Text style={{ marginBottom: 13 }} fontSize={14} fontWeight="700">
						{location}
					</Text>
					<Text fontSize={12} fontWeight="400">
						Estimated Period: {duration ?? 'Not Available'}{' '}
					</Text>
					{light == 1 ? (
						''
					) : (
						<Text style={{ marginTop: 8 }}>
							Last Seen: {lastSeen ?? 'Not Available'}
						</Text>
					)}
					{faulty == 1 ? (
						<Text
							color={colors.red}
							style={{ marginTop: 8 }}
							fontSize={10}
							fontWeight="300"
						>
							Faulty
						</Text>
					) : (
						''
					)}
				</View>
				<View>
					{light == 1 ? (
						<Icons size={40} name="light-on" />
					) : (
						<Icons size={40} name="light-off" />
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};
export default LightCard;

const styles = StyleSheet.create({
	container: {
		borderColor: 'rgba(2, 44, 78, 0.2)',
		borderWidth: 1,
		borderStyle: 'dashed',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		borderRadius: 10,
	},
});
