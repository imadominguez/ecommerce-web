interface Props {
  params: {
    id?: string;
  };
}

export default function OrderDetailPage({ params: { id } }: Props) {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
