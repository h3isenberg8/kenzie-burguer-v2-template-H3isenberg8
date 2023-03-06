import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../provider/userContext/userContext';

const schema = yup
  .object()
  .shape({
    password: yup.string().min(3, 'password is too short').required(),
    email: yup
      .string()
      .email('Must insert a valid email')
      .required('Can not be blank'),
    name: yup.string().required('Can no be blank'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords dont match'),
  })
  .required();

const RegisterForm = () => {
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const manageRegister = (data) => {
    registerUser(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(manageRegister)}>
      <Input
        errorMessage={errors.name?.message as string}
        inputMessage='Nome'
        inputType='text'
        register={register}
        registerType='name'
      />
      <Input
        errorMessage={errors.email?.message as string}
        inputMessage='Email'
        inputType='text'
        register={register}
        registerType='email'
      />
      <Input
        errorMessage={errors.password?.message as string}
        inputMessage='Senha'
        inputType='password'
        register={register}
        registerType='password'
      />
      <Input
        errorMessage={errors.confirmPassword?.message as string}
        inputMessage='Confirmar Senha'
        inputType='password'
        register={register}
        registerType='confirmPassword'
      />

      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
