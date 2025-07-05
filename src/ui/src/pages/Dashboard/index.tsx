import { useEffect, useState } from 'react';
import InnerPageLayout from '@layouts/InnerPage';
import OrderSummary from './OrderSummary';
import { Button } from 'flowbite-react';
import Entries from './Entries';
import EntryForm from './EntryForm';
import { get, del } from 'src/requests';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState(null);
  const handleOnDelete = (id: string) => {
    del(`orders/${id}`).then((result) => {
      setData(null);
    });
  };

  useEffect(() => {
    if (!data) {
      get('orders').then((result) => {
        setData(result);
      });
    }
  }, [
    data,
  ]);

  return (
    <InnerPageLayout>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-full break-words">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Orders</h4>
          <Button disabled={showForm} onClick={() => setShowForm(true)}>Add Order</Button>
        </div>
      </div>
      <EntryForm show={showForm} resetEntries={() => setData(null)} onCancel={() => setShowForm(false)} />
      <OrderSummary entries={data} />
      <Entries entries={data} onDelete={handleOnDelete} />
    </InnerPageLayout>
  );
}