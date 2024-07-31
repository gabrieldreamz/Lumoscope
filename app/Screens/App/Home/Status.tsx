import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container, Footer, Header, LightCard, StackedBarChart, Text } from '../../../../components'
import colors from '../../../../constants/Colors'
import { layout } from '../../../../constants'
import { StackNavigationProps } from '../../../Navigation/types/types'
import { ClientRoutes } from '../../../Navigation'
import { useGetLightStatusByIDQuery } from '../../../../services/auth'
import { calculateTimeDifference } from '../../../../hooks/diffCalculator'


const Status = ({ route }: StackNavigationProps<ClientRoutes, 'Status'>) => {
  const { params } = route;
  const id = params.id
  console.log(id, 'id')
  const { data, isLoading } = useGetLightStatusByIDQuery({ id })

  console.log(data, 'params')
  return (
    <View style={styles.container}>
      <Header title='Power Status' />

      <View style={styles.content}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <>
            <View style={{ marginTop: 20 }}>

              <LightCard lastSeen={calculateTimeDifference(data.data?.light_end) ?? 'Not Available'} light={data?.data.is_light ? true : false ?? true} duration={data?.data.duration ?? 'Not Available'} location={data?.data.location ?? 'Not Available'} />

            </View>
            <View style={{ marginTop: "30%" }}>
              <Text style={{ textAlign: 'center' }} fontSize={14} fontWeight='700'>Last 7 days of Power Supply History</Text>
            </View>

            <StackedBarChart id={id ?? ''} />
          </>
        ) : (
          <Text>No data available</Text>
        )}
      </View>

    </View>
  );
}

export default Status

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});