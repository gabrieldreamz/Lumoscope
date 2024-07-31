import React, { useState, useEffect, useContext, useRef } from 'react';
import { Animated, Dimensions, FlatList, ImageBackground, StyleSheet, View, ViewToken } from 'react-native';
import { Button, Container, Text } from '../../../components';
import { CarouselPaths, imagePath } from './Data/OnboardArray';
import colors from '../../../constants/Colors';
import { AppRoutes } from '../../Navigation';
import { OnboardUserContext } from '../../Contexts';

import CircularProgress from './Data/CircularProgress';
import { StackNavigationProps, useStackNavigationProp } from '../../Navigation/types/types';
import { useNavigation } from '@react-navigation/native';
import { layout } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setOnboarded } from '../../../store/features/authSlice';

// import { layout } from '../App';

const OnboardOne = () => {
  const dispatch = useAppDispatch()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iconProgress, setIconProgress] = useState(new Animated.Value(0));
  const flatListRef = useRef<FlatList<imagePath>>(null);

  const onViewableItemsChanged = (info: { viewableItems: ViewToken[] }) => {
    const firstVisibleItem = info.viewableItems.find((item) => item.index !== undefined);
    if (firstVisibleItem) {
      setCurrentIndex(firstVisibleItem.index || 0);
    }
  };

  const scrollToNext = () => {
    if (flatListRef.current && currentIndex < CarouselPaths.length - 1) {
      flatListRef.current.scrollToIndex({ animated: true, index: currentIndex + 1 });
    }
  };

  useEffect(() => {
    // Animate the icon progress when currentIndex changes
    Animated.timing(iconProgress, {
      toValue: currentIndex,
      duration: 500, // Adjust animation duration as needed
      useNativeDriver: true, // Enable native driver for performance
    }).start();
  }, [currentIndex]);

  const handleOnboarded = () => {
    dispatch(setOnboarded(true))
  };
  return (
    <Container>
      <View>
        <FlatList
          ref={flatListRef}
          horizontal
          onViewableItemsChanged={onViewableItemsChanged}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={currentIndex}
          data={CarouselPaths}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <ImageBackground source={item.image} style={styles.image} />

              <View style={styles.bottom}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.cursor}>
                    <CircularProgress percentage={(currentIndex + 1) * (100 / CarouselPaths.length)} />
                  </View>
                </View>
                <View style={styles.text}>
                  <Text style={styles.big} fontSize={20} color={colors.white} fontWeight='700'>{item.BigText}</Text>
                  <Text fontSize={14} fontWeight='400' style={styles.norm} color={colors.textColor}>
                    {item.normal}
                  </Text>
                </View>

                <View style={styles.btns}>
                  <Button style={styles.btn1} text={item.btn1} onPress={() => {
                    if (item.pathOne) {
                      handleOnboarded();
                    } else {
                      scrollToNext();
                    }
                  }} />
                  <Button textStyle={{ color: colors.primaryBtn }} style={styles.btn2} text={item.btn2} onPress={handleOnboarded} />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Container >
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: layout.window.height / 2,
  },
  container: {
    width: layout.window.width,
    flex: 1,
    height: layout.window.height,
    alignItems: 'center',
  },
  btn1: {
    borderRadius: 20,
    backgroundColor: colors.primaryBtn,
    textAlign: 'center',
  },
  btn2: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: colors.primaryBtn,
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 47,
  },
  bottom: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 24,
    width: layout.window.width,
  },
  btns: {
    marginTop: 64,
  },
  norm: {
    marginTop: 10,
    textAlign: 'center',
  },
  big: {

  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursor: {

    marginTop: -20,
    height: 90,
    width: 90,
    zIndex: -1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBlue,
    borderRadius: 60,
  },
  circle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
});

export default OnboardOne;
