/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';

import { addToCart, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addToCart(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-50 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && 
          <div className='flex items-center gap-2 sm:gap-6'>
            <UpdateItemQuantity pizzaId={id} quantity={currentQuantity} />
            <DeleteItem pizzaId={id} >remove</DeleteItem>
          </div>
          }
          {!soldOut && !isInCart && (
            <Button
              onClick={handleAddToCart}
              disabled={soldOut}
              btnStyle="small"
            >
            add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
