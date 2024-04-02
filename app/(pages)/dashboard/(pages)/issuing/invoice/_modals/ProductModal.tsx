import { ProductType } from "@/types/prismaSchemaTypes";
import React from "react";

type ProductModalType = {
  setProductNameId: Function;
  setIsProductModal: Function;
  setProductUm: Function;
  dbProductsState: ProductType[];
};

const ProductModal = ({
  setProductNameId,
  setIsProductModal,
  setProductUm,
  dbProductsState,
}: ProductModalType) => {
  const handleClick = (
    newProductId: string,
    newProductName: string,
    newProductUm: string
  ) => {
    setProductNameId({ id: newProductId, name: newProductName });
    setProductUm(newProductUm);
    setIsProductModal(false);
  };
  return (
    <ul className="product-modal">
      {dbProductsState.map((item) => (
        <li
          key={item.id}
          onClick={() => handleClick(item.id, item.name, item.um)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ProductModal;
