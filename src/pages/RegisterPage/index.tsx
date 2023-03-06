import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { StyledRegisterPage } from './style';
import RegisterForm from '../../components/Form/RegisterForm';
import IllustrationBox from '../../components/IllustrationBox';
import { StyledContainer, StyledGridBox } from '../../styles/grid';
import { StyledTitle } from '../../styles/typography';
import { UserContext } from '../../provider/userContext/userContext';

const RegisterPage = () => {
  const { checkIfUserHasAlreadyLogged, moveUser } = useContext(UserContext);

  moveUser();

  return (
    <StyledRegisterPage>
      <StyledContainer>
        <div className='flexGrid'>
          <div className='left'>
            <IllustrationBox />
          </div>
          <div className='right'>
            <StyledGridBox className='formBox'>
              <header>
                <StyledTitle tag='h1' $fontSize='three'>
                  Cadastro
                </StyledTitle>
                <Link to='/'>Retornar para o login</Link>
              </header>

              <RegisterForm />
            </StyledGridBox>
          </div>
        </div>
      </StyledContainer>
    </StyledRegisterPage>
  );
};

export default RegisterPage;
