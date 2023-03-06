import { MdShoppingCart, MdLogout } from 'react-icons/md';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';
import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../provider/cartContext/cartContext';

const Header = () => {
  const { setCartModalState } = useContext(CartContext);
  const navigate = useNavigate();

  const logUserOut = () => {
    localStorage.clear('@tokenAndID');
    navigate('/');
  };

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  setCartModalState(true);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button type='button' onClick={logUserOut}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
