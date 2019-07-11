import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const {
  styles, fontColor, selectedIconColor, fontSelectedColor
} = require('./burgerStyle');

const PropertyLabel = ({ property, change }) => (
  <TouchableOpacity style={styles.item} onPress={() => change(property.value)}>
    <View style={styles.iconContainer}>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={property.selected ? selectedIconColor : fontColor}
      />
    </View>
    <Text style={[styles.label, { color: property.selected ? fontSelectedColor : fontColor }]}>
      {property.label}
    </Text>
  </TouchableOpacity>
);

export default PropertyLabel;
