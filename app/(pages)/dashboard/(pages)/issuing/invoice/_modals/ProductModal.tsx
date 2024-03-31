import { ProductType } from "@/types/prismaSchemaTypes";
import React from "react";

type ProductModalType = {
  setProductName: Function;
  setIsProductModal: Function;
  setProductUm: Function;
  dbProducts: ProductType[];
};

const ProductModal = ({
  setProductName,
  setIsProductModal,
  setProductUm,
  dbProducts,
}: ProductModalType) => {
  const handleClick = (newProductName: string, newProductUm: string) => {
    setProductName(newProductName);
    setProductUm(newProductUm);
    setIsProductModal(false);
  };
  return (
    <ul className="product-modal">
      {dbProducts.map((item) => (
        <li key={item.id} onClick={() => handleClick(item.name, item.um)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ProductModal;
