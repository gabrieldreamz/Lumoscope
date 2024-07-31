import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Container, FormInput, Header, Text } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import colors from '../../../../constants/Colors';
import { logout } from '../../../../store/features/authSlice';
import { apiUtilTool } from '../../../../services/api';

const Profile = () => {
	const { user, location } = useAppSelector((state) => state.authSlice);
	const dispatch = useAppDispatch();

	return (
		<Container>
			<Header title="Profile" />
			<View style={{ paddingHorizontal: 24, marginTop: '30%' }}>
				<View>
					<FormInput
						label="Name"
						value={String(user?.user?.name ?? 'Not Provided')}
						style={styles.textBox}
						placeholder="Name"
					/>
					<FormInput
						label="Email"
						value={String(user?.user?.email ?? 'Not Provided')}
						placeholder="Email"
						style={styles.textBox}
					/>
					<FormInput
						label="Phone Number"
						value={String(user?.user?.phone ?? 'Not Provided')}
						placeholder="Phone Number"
						style={styles.textBox}
					/>
					<FormInput
						label="Location"
						value={String(location ?? 'select Location')}
						placeholder="Location"
						style={styles.textBox}
					/>
					<Text
						onPress={() => {
							dispatch(logout());
							apiUtilTool.resetApiState();
						}}
						style={{ color: colors.primaryBlue }}
					>
						Log out
					</Text>
				</View>
				{/* <View style={{ marginTop: 20 }}>
					<Text style={{ color: colors.red, marginTop: 10 }}>
						Delete Account
					</Text> */}
			</View>
			{/* <View style={{ marginTop: 30 }}>
				<Button style={{ borderRadius: 15 }} onPress={() => { }} text={"Update"} />
			</View> */}
		</Container>
	);
};

export default Profile;

const styles = StyleSheet.create({
	textBox: {
		marginBottom: 10,
	},
});
