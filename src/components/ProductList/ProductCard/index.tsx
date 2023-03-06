import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import {
  CartContext,
  IFoodItem,
} from '../../../provider/cartContext/cartContext';

export interface IFoodItemsProps extends IFoodItem {}

const ProductCard = ({ img, type, price, name, id }: IFoodItemsProps) => {
  const { foodToAddInCart } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{type}</StyledParagraph>
        <StyledParagraph className='price'>{price}</StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          id={id}
          onClick={(event) => foodToAddInCart(event.target.id)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};
export default ProductCard;
