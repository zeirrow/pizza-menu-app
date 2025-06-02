/* eslint-disable react/prop-types */
// 2HN2HK
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();


  console.log({ order });
  return (
    <fetcher.Form method="PATCH" className='text-right' >
      <Button type='submit' onClick={() => {}} btnStyle="primary">
        Mark as priority
      </Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export async function action({params}) {
  const data = { priority: true }
  await updateOrder(params.orderId, data);
  return null;
}