export const getAllProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/all`);
  return res.json();
};
