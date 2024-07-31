import {
	View,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
	Modal,
	Linking,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Button, ErrorInfo, Text } from '../../../../components';
import colors from '../../../../constants/Colors';
import { New } from '../Data/test';
import { layout } from '../../../../constants';
import { useGetAdsQuery, useGetTimelineQuery } from '../../../../services/auth';

interface Props {
	marginRight?: number;
	title: string;
	body: string;
	contact?: string;
	uri: string;
	press?: () => void;
}
const Cards = ({ title, body, uri, marginRight, contact }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);

	const visitAd = useCallback(async () => {
		const canOpen = await Linking.canOpenURL(`https://wa.me/${contact}`);
		if (canOpen) {
			await Linking.openURL(`https://wa.me/${contact}`);
		} else {
			console.error('Unable to open URL');
		}
	}, [contact]);
	return (
		<View style={[styles.adCard, { marginRight }]}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.body}>{body}</Text>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Image style={{ height: 70, width: '100%' }} source={{ uri }} />
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalView}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setModalVisible(false)}
					>
						<Text style={styles.closeText}>Close</Text>
					</TouchableOpacity>
					<View style={styles.visit}>
						<Text
							style={{ marginBottom: 20, paddingHorizontal: 24 }}
							color={colors.whiteText}
						>
							{body}
						</Text>
						<Button onPress={visitAd} text="Visit Advertiser"></Button>
					</View>
					<Image source={{ uri }} style={styles.fullScreenImage} />
				</View>
			</Modal>
		</View>
	);
};
const Ads = () => {
	const { data, error, refetch, isLoading, isFetching } = useGetAdsQuery();
	// const navigation =
	// 	useNavigation<useStackNavigationProp<AppRoutes, 'ClientStack'>>();
	return (
		<>
			<FlatList
				data={data?.data || []}
				decelerationRate="fast"
				snapToInterval={layout.cards.walletWidth + 16}
				keyExtractor={(_, i) => i.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				ListHeaderComponent={<View style={{ width: 16 }} />}
				ListFooterComponent={<View style={{ width: 16 }} />}
				ListEmptyComponent={
					<>
						{error ? (
							<ErrorInfo visible={true} />
						) : (
							<Text style={{ paddingLeft: 10 }}>Ads not available</Text>
						)}
					</>
				}
				renderItem={({ item, index }) => {
					const last = index === New.length - 1;
					return (
						<Cards
							contact={item?.contact}
							body={item?.body ?? ''}
							title={item?.title ?? ''}
							marginRight={last ? 0 : 16}
							uri={`https://futatab.com/${item?.image}`}
						/>
					);
				}}
			/>
		</>
	);
};
export default Ads;

const styles = StyleSheet.create({
	adCard: {
		flex: 1,
		overflow: 'hidden',
		width: layout.cards.adsWidth,
		height: 200,
		borderRadius: 10,
		padding: 15,
		backgroundColor: colors.primaryBlue,
	},
	title: {
		color: colors.white,
		fontSize: 15,
		fontWeight: '700',
		marginBottom: 10,
	},
	body: { color: colors.white, marginBottom: 10, fontSize: 13 },
	modalView: {
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fullScreenImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	closeButton: {
		position: 'absolute',
		top: 40,
		right: 20,
		zIndex: 1,
	},
	visit: {
		position: 'absolute',
		bottom: 20,
		zIndex: 1,
	},
	closeText: {
		color: 'white',
		fontSize: 18,
	},
});
