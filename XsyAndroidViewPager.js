import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'XsyAndroidViewPager',
  propTypes: {
    pageMargin: PropTypes.number,
    scrollEnabled: PropTypes.bool,
    ...View.propTypes // 包含默认的View的属性
  },
};

module.exports = requireNativeComponent('XsyAndroidViewPager', iface);