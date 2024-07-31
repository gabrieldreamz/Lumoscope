import {
	FlatList,
	RefreshControl,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import {
	ErrorInfo,
	LightCard,
	Text,
	VirtualScroll,
} from '../../../../components';
import { Icons } from '../../../../assets/Icons';
import colors from '../../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ClientRoutes } from '../../../Navigation';
import { useStackNavigationProp } from '../../../Navigation/types/types';
import { layout } from '../../../../constants';
import { useGetLightQuery } from '../../../../services/auth';
import { calculateTimeDifference } from '../../../../hooks/diffCalculator';

const LightStatusComp = () => {
	const { data, error, isLoading, isFetching, refetch } = useGetLightQuery();
	const navigation =
		useNavigation<useStackNavigationProp<AppRoutes, 'ClientStack'>>();
	return (
		<>
			{isLoading ? (
				<Text>Loading..</Text>
			) : (
				<VirtualScroll
					refreshControl={
						<RefreshControl
							onRefresh={() => {
								try {
									refetch();
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
					<FlatList
						// style={{ height: layout.window.height / 2.2 }}
						data={data?.data || []}
						keyExtractor={(_, i) => i.toString()}
						horizontal={false}
						ListEmptyComponent={
							<>
								{error ? (
									<ErrorInfo visible={true} />
								) : (
									<Text style={{ paddingLeft: 10 }}>
										Light Update not available
									</Text>
								)}
							</>
						}
						ItemSeparatorComponent={() => (
							<View
								style={{
									marginTop: 10,
									marginBottom: 10,
									borderWidth: 1,
									borderColor: colors.borderSep,
								}}
							/>
						)}
						renderItem={({ item, index }) => {
							return (
								<>
									<LightCard
										press={() => {
											navigation.navigate('ClientStack', {
												screen: 'Status',
												params: { id: item.id ?? '' },
											});
										}}
										lastSeen={calculateTimeDifference(item.light_end)}
										light={item.is_light}
										location={item.location}
										duration={item.duration}
										faulty={item.is_faulty}
									/>
								</>
							);
						}}
					/>
				</VirtualScroll>
			)}
		</>
	);
};
export default LightStatusComp;
