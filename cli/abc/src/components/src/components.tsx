import PropTypes from 'prop-types';

export function defineListenerProp<F>(fallback?: any) {
    return {
      type: [Function, Array] as PropTypes<F | F[]>,
      default: fallback,
    }
  }