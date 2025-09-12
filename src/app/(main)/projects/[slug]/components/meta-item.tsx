interface MetaItem {
  label: string;
  value: React.ReactNode;
}

const MetaItem = ({ label, value }: MetaItem) => {
  return (
    <dl className="space-y-2">
      <dt className="text-xs tracking-wider text-gray-500 uppercase">{label}</dt>
      <dd className="text-gray-800 font-medium">{value}</dd>
    </dl>
  );
};

export default MetaItem;
