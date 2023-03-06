import { useContext, useEffect, useState } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../provider/cartContext/cartContext';
import { toast } from 'react-hot-toast';

const CartProductList = () => {
  const { foodsInCart, setFoodsInCart, sumAllValues } = useContext(CartContext);

  const [testValue, setTestValue] = useState(0);

  useEffect(() => {
    let totalValue = sumAllValues();
    setTestValue(totalValue);
  }, [foodsInCart]);

  return (
    <StyledCartProductList>
      <ul>
        {foodsInCart.length > 0
          ? foodsInCart.map((e) => (
              <CartProductCard img={e.img} name={e.name} id={e.id} />
            ))
          : null}
      </ul>

      {foodsInCart.length > 0 ? (
        <>
          <div className='totalBox'>
            <StyledParagraph>
              <strong>Total</strong>
            </StyledParagraph>
            <StyledParagraph className='total'>R$ {testValue}</StyledParagraph>
          </div>
          <StyledButton
            $buttonSize='default'
            $buttonStyle='gray'
            onClick={() => {
              setFoodsInCart([]);
              toast.success('Todos itens foram removidos com sucesso', {
                position: 'top-right',
                duration: 2000,
              });
            }}
          >
            Remover todos
          </StyledButton>
        </>
      ) : null}
    </StyledCartProductList>
  );
};

export default CartProductList;
