import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import colors from '../constants/Colors';
import { useGetChartQuery } from '../services/auth';
import { ActivityIndicator } from 'react-native';
import { Text } from './Text';

interface Props {
	id: string;
}

const StackedBarChart = ({ id }: Props) => {
	const { data, isLoading } = useGetChartQuery({ id });

	if (isLoading) {
		// Optionally, you can render a loading indicator here
		return <ActivityIndicator size="large" color={colors.primary} />;
	}

	if (!data || data?.data.length === 0) {
		return (
			<Text
				style={{ color: colors.textColor, textAlign: 'center', marginTop: 40 }}
			>
				Data unavailable at the moment.
			</Text>
		);
	}

	return (
		<BarChart
			xAxisLabelTextStyle={{
				fontWeight: 400,
				color: colors.textColor,
				fontSize: 12,
				fontFamily: 'Montserrat-Light',
			}}
			yAxisTextStyle={{
				color: colors.textColor,
				fontSize: 12,
				fontFamily: 'Montserrat-Light',
			}}
			sideWidth={0}
			isThreeD
			topColor={colors.primaryBlue}
			barBorderRadius={8}
			frontColor={colors.primaryBtn}
			xAxisColor={'transparent'}
			yAxisColor={'transparent'}
			dashGap={0}
			spacing={15}
			initialSpacing={18}
			barWidth={24}
			stepValue={4}
			maxValue={24}
			data={data?.data ?? []}
		/>
	);
};

export default StackedBarChart;
