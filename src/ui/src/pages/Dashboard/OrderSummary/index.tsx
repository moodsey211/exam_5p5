import Item from './Item';
import useSummary from '@hooks/summary';
import { Spinner } from 'flowbite-react';

export default function OrderSummary(props: any) {
  const { data, loading, error } = useSummary();

    if (error) {
      console.error(data);
      return (
        <div>something went wrong</div>
      );
    }

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="flex gap-4">
        <Item loading={loading} title="Total Revenue" value={data.totalRevenue} />
        <Item loading={loading} title="Median" value={data.medianOrderPrice} />
        <Item loading={loading} title="Top Product" value={data.topProductByQty} />
        <Item loading={loading} title="Unique Product" value={data.uniqueProductCount} />
      </div>
    );
  }
  