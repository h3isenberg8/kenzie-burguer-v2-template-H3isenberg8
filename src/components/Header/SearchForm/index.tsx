import { MdSearch } from 'react-icons/md';
import { useContext, useState } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../provider/cartContext/cartContext';

const SearchForm = () => {
  const { getItems } = useContext(CartContext);

  const [searchValue, setSearchValue] = useState('');

  function test(event) {
    event.preventDefault();
    getItems(searchValue);
  }

  return (
    <StyledSearchForm>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <StyledButton
        type='submit'
        $buttonSize='medium'
        $buttonStyle='green'
        onClick={test}
      >
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
