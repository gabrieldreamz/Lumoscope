import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { StackNavigationProps } from '../../../Navigation/types/types';
import { ClientRoutes } from '../../../Navigation';
import {
	Container,
	Form,
	FormPicker,
	NetowrkAware as NetworkAware,
	Text,
	VirtualScroll,
} from '../../../../components';
import { Icons } from '../../../../assets/Icons';
import LightStatusComp from './LightCard';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
	useGetLightQuery,
	useGetLocationQuery,
	useGetTimelineQuery,
	useLocationMutateMutation,
} from '../../../../services/auth';
import { setLocation } from '../../../../store/features/authSlice';
import colors from '../../../../constants/Colors';
import { handleMutationService } from '../../../../services/config/handleService';
import Toast from 'react-native-toast-message';
import Ads from './Ads';

interface Inputs {
	location: string;
}

const Dashboard = ({
	navigation,
}: StackNavigationProps<ClientRoutes, 'Dashboard'>) => {
	const { user, location: storedLocation } = useAppSelector(
		(state) => state.authSlice
	);
	const dispatch = useAppDispatch();
	const [locationMutation] = useLocationMutateMutation();
	const [inputs, setInputs] = useState<Inputs>({
		location: storedLocation || '',
	});
	const { data, refetch, isLoading, isFetching } = useGetLocationQuery();
	const { refetch: refetchTimeline } = useGetTimelineQuery();
	const { refetch: refetchLight } = useGetLightQuery();
	const refetchAll = async () => {
		try {
			await Promise.all([refetchLight(), refetchTimeline(), refetch()]);
		} catch (error) {
			console.warn('REFETCH ERROR', error);
		}
	};
	const getTimeOfDay = () => {
		const currentTime = new Date().getHours();
		if (currentTime >= 5 && currentTime < 12) {
			return 'morning';
		} else if (currentTime >= 12 && currentTime < 17) {
			return 'afternoon';
		} else {
			return 'evening';
		}
	};

	const [timeOfDay, setTimeOfDay] = useState('');
	useEffect(() => {
		const time = getTimeOfDay();
		setTimeOfDay(time);
		refetchAll();
	}, []);

	const initialValues = {
		location: inputs.location || '', // Use stored location as initial value
	};

	const onSubmit = (val: { location: string }) => {
		handleMutationService({
			mutation: locationMutation({
				id: user?.user?.id,
				location: val.location,
			}),
			onError(error) {
				console.log(error);
			},
			onSuccess() {
				Toast.show({
					type: 'success',
					text1: 'Location added successfully.',
				});
				dispatch(setLocation(val.location));
			},
		});
	};

	return (
		<VirtualScroll
			refreshControl={
				<RefreshControl
					onRefresh={refetchAll}
					refreshing={isLoading || isFetching}
					tintColor={colors.primary}
					colors={[colors.primary]}
				/>
			}
		>
			<NetworkAware heightInsets />
			<Container>
				<View style={styles.container}>
					<View style={styles.header}>
						<View>
							<Text fontSize={14} fontWeight="700">
								Welcome to Lumoscape!
							</Text>
							<View style={{ alignItems: 'center', flexDirection: 'row' }}>
								<Text fontSize={14} fontWeight="400">
									Good {timeOfDay} {user?.user?.name}{' '}
								</Text>
								<Icons size={12} name="waving" />
							</View>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Icons
								onPress={() => navigation.navigate('CityBuzz')}
								size={24}
								name="light-availability"
							/>
							<Icons
								onPress={() => navigation.navigate('Profile')}
								size={24}
								style={{ marginLeft: 10 }}
								name="settings"
							/>
						</View>
					</View>
					<View style={{ marginTop: 24 }}>
						<Form initialValues={initialValues} onSubmit={onSubmit}>
							<FormPicker
								items={
									data?.data.map((state) => ({
										label: state?.location,
										value: state?.id,
									})) ?? []
								}
								onSelectItem={(item) => {
									const newLocation = item.label;
									setInputs({ location: newLocation });
									handleMutationService({
										mutation: locationMutation({
											id: user?.user?.id,
											location: newLocation,
										}),
										onError(error) {
											console.log(error);
										},
										onSuccess() {
											Toast.show({
												type: 'success',
												text1: 'Location added successfully.',
											});
											dispatch(setLocation(newLocation));
										},
									});
								}}
								name="location"
								LeftComponent={<Icons size={24} name="location" />}
								placeholder={user ? user?.user.location : 'Select Location'}
							/>
						</Form>
					</View>
				</View>

				<View>
					<View style={styles.heading}>
						<Text fontSize={12} color={colors.primaryBlue} fontWeight="600">
							Sponsored
						</Text>
					</View>
					<View>
						<Ads />
					</View>
				</View>
				<View style={styles.container}>
					<View style={{ marginTop: 33 }}>
						<Text fontSize={14} style={{ marginBottom: 16 }} fontWeight="700">
							Power Status in Nearby Areas
						</Text>
						<LightStatusComp />
					</View>
				</View>
			</Container>
		</VirtualScroll>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingTop: 14,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	heading: {
		flexDirection: 'row',
		paddingHorizontal: 24,
		marginBottom: 16,
		justifyContent: 'flex-end',
	},
});
