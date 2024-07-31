import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const xSmall = width < 325;
const small = width >= 325 && width < 350; //325 > width > 350
const medium = width >= 350 && width < 450;
const large = width >= 450;

export default {
	cards: {
		announcementCard: width - 16 * 13,
		cardRadius: 0,
		cardSize: 120,
		genreHeight: 90,
		trackHeight: 0,
		walletHeight: 120,
		walletRadius: 8,
		walletWidth: width - 16 * 4,
		adsWidth: width - 24,
	},
	dimension: {
		isLandscape: height < width,
		isLargeDevice: large,
		isMediumDevice: medium,
		isPhone: width < 450,
		isPortrait: height > width,
		isSmallDevice: small,
		isSmallOrTiny: small || xSmall,
		isTablet: width >= 450,
		isTinyDevice: xSmall,
	},
	fonts: {
		//fonts
		body: xSmall ? 14 : small ? 15 : medium ? 16 : 17,
		callout: xSmall ? 13 : small ? 14 : medium ? 14 : 16,
		caption1: xSmall ? 11 : small ? 11 : 12,
		caption2: xSmall ? 11 : small ? 11 : 12,
		footnote: xSmall ? 12 : small ? 12 : 13,
		headline: xSmall ? 14 : small ? 15 : medium ? 16 : 17,
		largeTitle: xSmall ? 28 : small ? 30 : 34,
		subhead: xSmall ? 12 : small ? 13 : medium ? 14 : 15,
		title1: xSmall ? 22 : small ? 24 : 28,
		title2: xSmall ? 20 : small ? 20 : 22,
		title3: xSmall ? 18 : small ? 18 : 20,
	},
	input: {
		borderSize: 1,
		borderWidth: 1.5,
		height: 50,
		inputBottom: 15,
		inputRadius: 10,
	},
	misc: {
		avatar: 32,
		avatarLarge: 80,
		boxLayout: 80,
		icon: 24,
		pagination: 40,
		pill: 48,
		toastHeight: 100,
		width: 70,
	},
	numpad: {
		btnHeight: medium ? 55 : 50,
		inputHeight: 50,
	},
	spacing: {
		l: 24,
		m: 16,
		padding: 16,
		r: 20,
		s: 8,
		xl: 32,
		xl2: 32 * 2,
		xs: 4,
		xxl: 40,
		xxl2: 40 * 2,
	},
	window: {
		height,
		width,
	},
};
