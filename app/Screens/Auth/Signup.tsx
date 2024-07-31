import {
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	View,
	Alert,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Container, Form, FormField, Submit, Text } from '../../../components';
import colors from '../../../constants/Colors';
import { StackNavigationProps } from '../../Navigation/types/types';
import { AuthRoutes } from '../../Navigation';
import { useLoginMutation, useSignupMutation } from '../../../services/auth';
import { handleMutationService } from '../../../services/config/handleService';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/features/authSlice';

// Regex patterns
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^\d{10}$/; // Assuming phone number is 10 digits

interface SignupModel {
	Phone: string;
	Email: string;
	Name: string;
}

const Signup = ({ navigation }: StackNavigationProps<AuthRoutes, 'Signup'>) => {
	const [completeSignUp, { isLoading }] = useSignupMutation();
	const [completeLogin] = useLoginMutation();
	const dispatch = useAppDispatch();
	const [inputs, setInputs] = useState<SignupModel>({
		Phone: '',
		Email: '',
		Name: '',
	});

	const handleOnchange = (text: string, input: keyof SignupModel) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	// Validation functions
	const validateEmail = (email: string) => emailRegex.test(email);
	const validatePhone = (phone: string) => phoneRegex.test(phone);

	const disabled =
		Object.values(inputs).some((value) => value === '') ||
		!validateEmail(inputs.Email) ||
		!validatePhone(inputs.Phone);

	return (
		<>
			<Container>
				<ScrollView>
					<KeyboardAvoidingView>
						<View style={styles.container}>
							<Text fontWeight="600" fontSize={24}>
								Create an account
							</Text>
							<Text fontWeight="400" fontSize={12} style={{ marginTop: 10 }}>
								Sign up to unlock personalized features and power status updates
							</Text>
							<View style={styles.form}>
								<Form
									initialValues={{
										Name: '',
										Phone: '',
										Email: '',
									}}
									onSubmit={(value) => {
										// Validate inputs before submitting
										if (!validateEmail(value.Email)) {
											Alert.alert(
												'Invalid Email',
												'Please enter a valid email address.'
											);
											return;
										}
										if (!validatePhone(value.Phone)) {
											Alert.alert(
												'Invalid Phone Number',
												'Please enter a valid 10-digit phone number.'
											);
											return;
										}

										handleMutationService({
											mutation: completeSignUp({
												Email: value.Email || '',
												Phone: `+234${value.Phone}` || '',
												Name: value.Name || '',
											}),
											onSuccess(data) {
												if (data.success) {
													handleMutationService({
														mutation: completeLogin({
															phone: value.Phone || '',
														}),
														onSuccess(data) {
															dispatch(setUser(data));
														},
													});
												}
											},
										});
									}}
								>
									<FormField
										onTextChange={(text) => handleOnchange(text, 'Name')}
										label="Name"
										name="Name"
										placeholder="Input your name"
									/>
									<FormField
										onTextChange={(text) => handleOnchange(text, 'Email')}
										label="Email"
										name="Email"
										placeholder="Input your Email"
									/>
									<FormField
										LeftComponent={
											<Text style={{ marginLeft: 4 }}>{'+234'}</Text>
										}
										onTextChange={(text) => handleOnchange(text, 'Phone')}
										placeholder="Input your phone number"
										label="Phone Number"
										name="Phone"
										keyboardType="phone-pad" // Ensure numeric keyboard
									/>
									<Submit
										disabled={disabled}
										style={styles.btn}
										loading={isLoading}
										text="Submit"
									/>
								</Form>
								<View
									style={{
										flexDirection: 'row',
										marginTop: 10,
										justifyContent: 'center',
									}}
								>
									<Text fontSize={12} fontWeight="700">
										You have an account?
									</Text>
									<Text
										onPress={() => {
											navigation.navigate('Login');
										}}
										fontSize={12}
										style={{ color: colors.primaryBlue, marginLeft: 4 }}
									>
										Login
									</Text>
								</View>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</Container>
		</>
	);
};

export default Signup;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingTop: 47,
	},
	form: {
		marginTop: '20%',
	},
	btn: {
		borderRadius: 20,
		marginTop: '5%',
	},
});
