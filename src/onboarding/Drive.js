import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { wp, hp } from '../utils/responsive';
import { AppColors } from '../utils/AppColors';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppImages } from '../utils/AppImages';


const slides = [
  {
    id: 1,
    title: 'Numerous free\ntrial courses',
    subtitle: 'Free courses for you to\nfind your way to learning',
    image: AppImages.illustration01,
  },
  {
    id: 2,
    title: 'Quick and easy \n learning',
    subtitle:
      'Easy and fast learning at \n any time to help you \n improve various skills.',
    image: AppImages.illustration02,
  },
  {
    id: 3,
    title: 'Create your Own\nstudy plan',
    subtitle:
      'Study according to the \n study plan, make study \n more motivated',
    image: AppImages.illustration03,
  },
];

const Drive = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);

  // Auto Slide Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      flatListRef.current.scrollToIndex({ index: nextIndex });
      setCurrentSlide(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlide(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        style={styles.flatList}
      />

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentSlide && styles.activeDot]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Drive;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
    paddingHorizontal: wp(5),
  },
  flatList: {
    flexGrow: 0,
    marginTop: hp(5),
  },
  slide: {
    width: wp(100) - wp(10),
    alignItems: 'center',
  },
  image: {
    width: wp(80),
    height: hp(35),
  },
  title: {
    fontSize: RFValue(21),
    fontWeight: '700',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginTop: hp(3),
  },
  subtitle: {
    fontSize: RFValue(16),
    color: AppColors.textSecondary,
    textAlign: 'center',
    marginTop: hp(2),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  dot: {
    width: wp(3),
    height: wp(1.3),
    borderRadius: wp(1.5),
    backgroundColor: AppColors.disableDot,
    marginHorizontal: wp(1),
  },
  activeDot: {
    backgroundColor: AppColors.primary,
    width: wp(6),
  },
});
// This file contains the Drive component which is part of the onboarding process.
// It displays a series of slides with images and text, allowing users to learn about the app's features.
// The component includes auto-sliding functionality and a skip button for user convenience.
// The styles are defined using StyleSheet.create for better performance and maintainability.
// The component uses responsive design principles with the help of utility functions like wp and hp for width and height percentages.
// The AppColors utility is used to maintain consistent color usage across the app.
// The component is designed to be used within a React Native application, leveraging hooks for state management.