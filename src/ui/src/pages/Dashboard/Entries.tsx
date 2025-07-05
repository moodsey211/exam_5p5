import { Table, Button, Spinner } from "flowbite-react";

export default function Entries(props: any) {
  const { entries, onDelete } = props;
  
  if (!entries) {
    return <Spinner />;
  }

  return (
    <div className="mt-4 rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-full break-words">
      <div className="mt-3">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Product</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Unit Price</Table.HeadCell>
              <Table.HeadCell>Total Price</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {entries?.data?.map((entry: any) => (
                <Table.Row key={entry.id}>
                  <Table.Cell>{entry.id}</Table.Cell>
                  <Table.Cell>{entry.product}</Table.Cell>
                  <Table.Cell>{entry.qty}</Table.Cell>
                  <Table.Cell>{entry.price}</Table.Cell>
                  <Table.Cell>{entry.qty * entry.price}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => onDelete(entry.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}