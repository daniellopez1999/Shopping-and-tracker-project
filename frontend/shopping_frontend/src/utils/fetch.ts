export const getAllProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/all`);
  return res.json();
};

export const getAllTypes = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/all-products-type`
  );
  return res.json();
};

export const getProductsFilteredByType = async (selectedTypes: string[]) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/products/products-type?types=${encodeURIComponent(
      JSON.stringify(selectedTypes)
    )}`
  );
  return res.json();
};
