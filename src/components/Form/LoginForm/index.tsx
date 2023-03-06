import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  UserContext,
  IUserData,
} from '../../../provider/userContext/userContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const schema = yup
  .object()
  .shape({
    password: yup.string().min(3, 'password is too short').required(),
    email: yup
      .string()
      .email('Must insert a valid email')
      .required('Can not be blank'),
  })
  .required();

const LoginForm = () => {
  const { loginUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({
    resolver: yupResolver(schema),
  });

  const manageLogin: SubmitHandler<IUserData> = (data: IUserData) => {
    loginUser(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(manageLogin)}>
      <Input
        inputMessage='Email'
        inputType='text'
        register={register}
        registerType='email'
        errorMessage={errors.email?.message as string}
      />

      <Input
        inputMessage='Password'
        inputType='password'
        register={register}
        registerType='password'
        errorMessage={errors.password?.message as string}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green' type='submit'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
