// https://uibakery.io/regex-library/phone-number
// 2INNCC
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import store from '../../store';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, getUser } from '../user/userSlice';
import { clearCart, getCartItems, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const user = useSelector(getUser);
  const {
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((store) => store.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const name = user ? user : '';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isFetching = addressStatus === 'loading';

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST" action="/orders/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={name}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              required
              className="input w-full"
              disabled={isFetching}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[6px] top-0 z-30 rounded-lg shadow-lg shadow-stone-800 hover:shadow-stone-900 md:top-[6px]">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                btnStyle="small"
                disabled={isFetching}
              >
                {isFetching ? 'getting position...' : 'Get position'}
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want you yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button
            type="submit"
            btnStyle="primary"
            disabled={
              isSubmitting
            }
          >
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = 'Invalid phone number';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // TODO: DO NOT OVERUSE THIS
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
