import {
	FlatList,
	Image,
	ImageRequireSource,
	LayoutChangeEvent,
	RefreshControl,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Header, Text, VirtualScroll } from '../../../../components';
import colors from '../../../../constants/Colors';
import { NewsPaths } from './Data';
// import { layout } from '../Home'
import { Icons } from '../../../../assets/Icons';
import { layout } from '../../../../constants';
import {
	useGetReadPostsQuery,
	useGetTimelineQuery,
	usePostMutateMutation,
} from '../../../../services/auth';
import CardView from '../Home/Cards';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../Navigation';
import { useStackNavigationProp } from '../../../Navigation/types/types';
import { useAppSelector } from '../../../../store/hooks';
import { handleMutationService } from '../../../../services/config/handleService';

interface Props {
	heading: string;
	subtitle: string;
	uri?: string;
	id?: string;
}
interface PostModel {
	post_id: string;
	clicked_at: string;
}
const NewsCard = ({ heading, subtitle, id }: Props) => {
	const [showFullText, setShowFullText] = useState(false);
	const { user } = useAppSelector((state) => state.authSlice);
	const [showSeeMore, setShowSeeMore] = useState(false);
	const [postMutation] = usePostMutateMutation();
	const handleTextLayout = (event: any) => {
		const { height } = event.nativeEvent.layout;
		const lineHeight = 20; // Adjust this based on your font size and line height
		const numberOfLines = Math.ceil(height / lineHeight);

		if (numberOfLines > 4) {
			setShowSeeMore(true);
		}
	};

	const navigation =
		useNavigation<useStackNavigationProp<AppRoutes, 'ClientStack'>>();

	return (
		<View style={styles.card}>
			<Text style={styles.heading}>{heading}</Text>
			<Text
				style={styles.subtitle}
				numberOfLines={showFullText ? undefined : 6}
				ellipsizeMode="tail"
				onLayout={handleTextLayout}
			>
				{subtitle}
			</Text>
			{showSeeMore && !showFullText && (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('ClientStack', {
							screen: 'News',
							params: { id: id ?? '' },
						});
						handleMutationService({
							mutation: postMutation({
								userId: user?.user?.id,
								postId: id,
							}),
						});
					}}
				>
					<Text style={styles.seeMore}>See More</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const CityBuzz = () => {
	const { data, isLoading, refetch, isFetching, error } = useGetTimelineQuery();
	console.log(data);
	const { user } = useAppSelector((state) => state.authSlice);
	const [hasNewNotifications, setHasNewNotifications] =
		useState<boolean>(false);
	const {
		data: Read_Posts,
		refetch: ReadRefetch,
		isLoading: ReadLoading,
		isUninitialized,
	} = useGetReadPostsQuery({
		userId: user?.user.id ?? '',
	});

	const readPosts = useMemo(() => {
		return (
			Read_Posts?.data?.map((item: PostModel) => parseInt(item?.post_id, 10)) ||
			[]
		);
	}, [Read_Posts]);

	const allPosts = useMemo(() => {
		return data?.data?.map((item) => parseInt(item?.id, 10)) || [];
	}, [data]);

	useEffect(() => {
		if (readPosts.length > 0 && allPosts.length > 0) {
			const hasNew = allPosts.some((id) => !readPosts.includes(id));
			setHasNewNotifications(hasNew);
		}
	}, [readPosts, allPosts]);
	// const unreadPosts = ReadPosts?.interactionStatus.filter(
	// 	(post: { clicked: number }) => post.clicked === 0
	// );

	return (
		<VirtualScroll
			refreshControl={
				<RefreshControl
					onRefresh={() => {
						try {
							if (!isUninitialized) {
								refetch();
								ReadRefetch();
							}
						} catch (error) {
							console.warn('REFETCH ERROR', error);
						}
					}}
					refreshing={isLoading || isFetching}
					tintColor={colors.primary}
					colors={[colors.primary]}
				/>
			}
		>
			<Container>
				<Header
					subtitle="Stay Updated with the Latest Happenings"
					title="City Buzz"
					rightComponent={
						hasNewNotifications ? (
							<Icons name="unread-messages" />
						) : (
							<Icons name="notification" />
						)
					}
				/>
				<View style={styles.container}>
					<View style={{ marginTop: 10 }} />
					<CardView />
					<View style={{ marginBottom: 15 }} />
					{!error ? (
						<Text
							style={{
								fontSize: 13,
								marginBottom: 10,
								paddingHorizontal: 24,
								fontWeight: '600',
							}}
						>
							What's Buzzing in your city?
						</Text>
					) : (
						''
					)}
					{isLoading ? (
						'News Loading'
					) : (
						<FlatList
							// style={{ height: layout.window.height / 1.2 }}
							data={data?.data || []}
							keyExtractor={(_, i) => i.toString()}
							horizontal={false}
							renderItem={({ item, index }) => {
								return (
									<NewsCard
										subtitle={item?.description}
										heading={item?.title}
										id={item?.id}
									/>
									// <NewsCard uri={`http://192.168.0.102/lumoscope/${item.image_path}`} subtitle={item.description} heading={item.title} />
								);
							}}
						/>
					)}
				</View>
			</Container>
		</VirtualScroll>
	);
};

export default CityBuzz;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.buzzBg,
	},
	card: {
		paddingHorizontal: 23,
		backgroundColor: '#fff',
		marginBottom: 10,
	},
	heading: {
		marginTop: 15,
		marginBottom: 10,
		fontWeight: '600',
		fontSize: 14,
	},
	subtitle: {
		marginBottom: 15,
		fontWeight: '400',
		fontSize: 12,
	},
	seeMore: {
		color: 'blue',
		marginBottom: 15,
	},
	shareButton: {
		alignItems: 'center',
		marginBottom: 20,
	},
});
