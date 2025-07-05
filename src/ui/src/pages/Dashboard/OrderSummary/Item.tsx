import { Spinner } from 'flowbite-react';

export default function Item(props: any) {
  const { loading, title, value } = props;

  if (loading) {
    return (
      <div className="mt-4 rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-1/4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-1/4">
          <h4>{title}</h4>
          {value}
        </div>
        
  );
}
