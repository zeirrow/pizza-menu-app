/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { removeFromCart } from './cartSlice';

const DeleteItem = ({ pizzaId, children }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {

    dispatch(removeFromCart(pizzaId));
  };

  return (
    <Button onClick={handleRemoveFromCart} btnStyle="small">
      {children}
    </Button>
  );
};



export default DeleteItem;
