import {
	View,
	StyleSheet,
	ImageBackground,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ErrorInfo, Text } from '../../../../components';
import colors from '../../../../constants/Colors';
import { New } from '../Data/test';
import { layout } from '../../../../constants';
import {
	useGetTimelineQuery,
	usePostMutateMutation,
} from '../../../../services/auth';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../../Navigation';
import { useStackNavigationProp } from '../../../Navigation/types/types';
import { handleMutationService } from '../../../../services/config/handleService';
import { useAppSelector } from '../../../../store/hooks';

interface Props {
	marginRight?: number;
	item: string;
	uri: string;
	press: () => void;
}
const Cards = ({ marginRight, press, item, uri }: Props) => {
	return (
		<TouchableOpacity
			onPress={press}
			style={[styles.container, { marginRight }]}
		>
			<ImageBackground
				style={styles.card}
				source={{ uri, cache: 'force-cache' }}
			>
				<Text
					style={{ paddingHorizontal: 9, textAlign: 'left', marginTop: 62 }}
					fontSize={11}
					fontWeight="600"
					color={colors.white}
				>
					{item}
				</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};
const CardView = () => {
	const { data, error, refetch, isLoading, isFetching } = useGetTimelineQuery();
	const [postMutation] = usePostMutateMutation();
	const { user } = useAppSelector((state) => state.authSlice);
	const navigation =
		useNavigation<useStackNavigationProp<AppRoutes, 'ClientStack'>>();

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
					<View
						style={{
							marginTop: 20,
						}}
					>
						{error ? (
							<View
								style={{
									width: '100%',
									marginHorizontal: 40,
								}}
							>
								<ErrorInfo visible={true} />
							</View>
						) : (
							<Text style={{ paddingLeft: 10 }}>News not available</Text>
						)}
					</View>
				}
				renderItem={({ item, index }) => {
					const last = index === New.length - 1;
					return (
						<Cards
							press={() => {
								navigation.navigate('ClientStack', {
									screen: 'News',
									params: { id: item.id ?? '' },
								});
								handleMutationService({
									mutation: postMutation({
										userId: user?.user?.id,
										postId: item?.id,
									}),
								});
							}}
							item={item?.title}
							marginRight={last ? 0 : 16}
							uri={`https://futatab.com/${item?.image_path}`}
						/>
					);
				}}
			/>
		</>
	);
};
export default CardView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
		borderRadius: 10,
		backgroundColor: colors.black,
		width: layout.cards.walletWidth,
	},
	card: {
		height: 104,
		alignItems: 'center',
		flexDirection: 'row',
	},
});
