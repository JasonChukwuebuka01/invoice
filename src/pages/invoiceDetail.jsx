import { useParams } from 'react-router-dom';

export default function InvoiceDetails() {
  const { id } = useParams(); // This grabs the :id from the URL
  return (
    <div>
      <h1>Invoice {id}</h1>
      <p>Viewing details for a specific invoice.</p>
    </div>
  );
}