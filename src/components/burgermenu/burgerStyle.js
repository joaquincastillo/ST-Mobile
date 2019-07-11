import { StyleSheet } from 'react-native';

export const mainColor = '#fff';
export const headerColor = '#0c6';
export const selectedIconColor = '#0c6';
export const secondaryColor = '#283F3B';
export const selectedColor = '#eee';
export const fontColor = '#666';
export const fontSelectedColor = '#222';
export const logOutColor = '#fff';
export const logoHeight = '85%';
export const headerHeight = '10%';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: logOutColor,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: fontColor,
  },
  burgerSeparator: {
    height: 0,
    width: '90%',
    borderColor: '#efefef',
    alignSelf: 'center'
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
