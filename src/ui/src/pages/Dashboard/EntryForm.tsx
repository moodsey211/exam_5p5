import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { post } from "src/requests";

export default function EntryForm(props: any) {
  const { show, resetEntries, onCancel } = props;
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    post('orders', {
      product,
      qty: quantity,
      price: unitPrice,
    }).then((result) => {
      if (result.success) {
        resetEntries();
        onCancel();
      } else {
        setErrorMessage(result?.error?.message);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-full break-words">
      <h5 className="card-title">New Order</h5>
      <div className="mt-3">
        {errorMessage && (
          <div className="mb-3">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{errorMessage}</span> 
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 gap-30">
          <div className="lg:col-span-3 col-span-12">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="product" value="Product" />
                </div>
                <TextInput id="product" required className="select-rounded" value={product} onChange={(e) => setProduct(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-12">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Quantity" />
                </div>
                <TextInput id="quantity" required className="select-rounded" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-12">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput id="price" required className="select-rounded" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-6">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">&nbsp;</div>
                <Button disabled={isLoading} className="w-full" onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-6">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">&nbsp;</div>
                <Button disabled={isLoading} className="w-full bg-red-500" onClick={onCancel}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}