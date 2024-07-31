
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardOne } from '../../Screens';
import { OnboardingRoutes } from '../types';

const Onboarding = createStackNavigator<OnboardingRoutes>();

export default function OnboardingStack(): JSX.Element {
  return (
    <Onboarding.Navigator screenOptions={{ headerShown: false }}>
      <Onboarding.Screen name="OnboardOne" component={OnboardOne} />
    </Onboarding.Navigator>
  );
}
