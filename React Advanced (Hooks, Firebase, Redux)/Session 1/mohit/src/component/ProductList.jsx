function FlipkartProductList() {
  const { loading, data, error } = useFetchData(
    "https://fakestoreapi.com/products"
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Flipkart Product List</h2>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
