import PropTypes from 'prop-types';

const generatePropTypes = (data) => {
  if (typeof data !== 'object' || data === null) return PropTypes.any;

  if (Array.isArray(data)) {
    return PropTypes.arrayOf(generatePropTypes(data[0]));
  }

  const propTypes = {};
  for (const key in data) {
    if (typeof data[key] === 'string') propTypes[key] = PropTypes.string;
    else if (typeof data[key] === 'number') propTypes[key] = PropTypes.number;
    else if (typeof data[key] === 'boolean') propTypes[key] = PropTypes.bool;
    else if (Array.isArray(data[key])) propTypes[key] = PropTypes.arrayOf(generatePropTypes(data[key][0]));
    else if (typeof data[key] === 'object') propTypes[key] = PropTypes.shape(generatePropTypes(data[key]));
    else if (typeof data[key] === 'function') propTypes[key] = PropTypes.func;
    else propTypes[key] = PropTypes.any;
  }

  return propTypes;
};

export default generatePropTypes;



/* 

3. Common PropTypes
PropType	Description
PropTypes.string	Must be a string
PropTypes.number	Must be a number
PropTypes.bool	Must be a boolean
PropTypes.array	Must be an array
PropTypes.object	Must be an object
PropTypes.func	Must be a function
PropTypes.node	Any renderable element (string, number, component, etc.)
PropTypes.element	A React element
PropTypes.oneOf(['A', 'B'])	Must be one of the specified values
PropTypes.oneOfType([PropTypes.string, PropTypes.number])	Can be one of multiple types
PropTypes.arrayOf(PropTypes.string)	An array where every item is a string
PropTypes.shape({ name: PropTypes.string })	Object with defined shape

*/