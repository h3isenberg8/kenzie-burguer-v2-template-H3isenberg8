import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../provider/cartContext/cartContext';

const ProductList = () => {
  const { foodsToRender } = useContext(CartContext);

  return (
    <StyledProductList>
      {foodsToRender.length > 0
        ? foodsToRender.map((e) => (
            <ProductCard
              img={e.img}
              name={e.name}
              price={`R$ ${e.price}`}
              type={e.category}
              id={e.id}
            />
          ))
        : null}
    </StyledProductList>
  );
};

export default ProductList;
