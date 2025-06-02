/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

const UpdateItemQuantity = ({ pizzaId, quantity }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    dispatch(increaseItemQuantity(pizzaId));
  }
  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        onClick={handleDecreaseQuantity}
        btnStyle="round"
      >
        ➖
      </Button>
      <p className="text-lg font-bold">{quantity}</p>
      <Button
        onClick={handleIncreaseQuantity}
        btnStyle="round"
      >
        ➕
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
