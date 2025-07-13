type Props = {
  description: string;
  attributes: {
    id: string;
    name: string;
    value_name: string;
  }[];
};

const ProductDescription = ({ description, attributes }: Props) => {
  return (
    <div className="pt-8 mt-8 border-t border-gray-300">
      <h2 className="text-lg font-bold mb-2">Descripción</h2>
      <p className="text-sm text-gray-800 mb-6">{description}</p>

      <h2 className="text-lg font-bold mb-2">Características</h2>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        {attributes.map((attr) => (
          <li key={attr.id}>
            <strong>{attr.name}:</strong> {attr.value_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDescription;
