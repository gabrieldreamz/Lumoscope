import { Image, StyleSheet, View } from 'react-native';
import images from '../assets/images/images';
import { Text } from './Text';
import colors from '../constants/Colors';

interface Props {
	visible: boolean;
}

export default function ErrorInfo({ visible }: Props): JSX.Element | null {
	if (!visible) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.error}
				source={images['errorCloud']}
				resizeMode="contain"
			/>
			<Text fontSize={12} color={colors.secondaryTextColor}>
				There was an error loading your data
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	error: {
		alignSelf: 'center',
	},
});
