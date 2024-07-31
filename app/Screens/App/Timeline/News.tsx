import {
	Alert,
	Image,
	Linking,
	Modal,
	ScrollView,
	Share,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { Container, Header, Text } from '../../../../components';
import colors from '../../../../constants/Colors';
import { Icons } from '../../../../assets/Icons';

import { StackNavigationProps } from '../../../Navigation/types/types';
import { ClientRoutes } from '../../../Navigation';
import { useGetTimelineByIdQuery } from '../../../../services/auth';

interface Props {
	heading: string;
	subtitle: string;
	uri: string;
}

const News = ({ route }: StackNavigationProps<ClientRoutes, 'News'>) => {
	const { params } = route;
	const id = params.id;

	const sharePost = async (id: string) => {
		const url = `com.Lumoscope://lumoscopeLink/News/${id}`;
		try {
			const result = await Share.share({
				message: `Lumoscope News | ${url}`,
				url: url,
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			console.error(error.message);
		}
	};
	const { data, isLoading } = useGetTimelineByIdQuery({ id });
	const NewsCard = ({ heading, subtitle, uri }: Props) => {
		const cleanSubtitle = subtitle.replace(/[\r\n]+/g, ' ');
		const [modalVisible, setModalVisible] = useState(false);
		return (
			<ScrollView
				style={{
					paddingHorizontal: 23,
					height: '100%',
					backgroundColor: colors.white,
					marginBottom: 10,
					flex: 1,
				}}
			>
				<Text
					style={{ marginTop: 15, marginBottom: 10 }}
					fontWeight="600"
					fontSize={14}
				>
					{heading}
				</Text>
				<Text style={{ marginBottom: 15 }} fontWeight="400" fontSize={12}>
					{cleanSubtitle}
				</Text>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Image
						source={{ uri }}
						style={{
							width: '100%',
							height: 200,
							marginBottom: 17,
							borderRadius: 8,
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						sharePost(id);
					}}
					style={{ alignItems: 'center' }}
				>
					<Icons style={{ marginBottom: 20 }} name="share" />
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
						<View style={styles.visit}></View>
						<Image source={{ uri }} style={styles.fullScreenImage} />
					</View>
				</Modal>
			</ScrollView>
		);
	};
	return (
		<Container>
			<ScrollView style={{ flex: 1 }}>
				<Header
					subtitle="Stay Updated with the Latest Happenings"
					title="City Buzz"
				/>
				<View style={styles.container}>
					{isLoading ? (
						<Text>Loading...</Text>
					) : data ? (
						<NewsCard
							key={data?.data?.id}
							uri={`https://futatab.com/${data?.data.image_path}`}
							subtitle={data?.data.description}
							heading={data?.data.title}
						/>
					) : (
						<Text>No data available</Text>
					)}
				</View>
			</ScrollView>
		</Container>
	);
};

export default News;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.buzzBg,
	},
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
