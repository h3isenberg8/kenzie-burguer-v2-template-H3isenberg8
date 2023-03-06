import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface InputProps {
  inputMessage: string;
  inputType: string;
  register: any;
  registerType: string;
  errorMessage: string;
}

const Input = ({
  inputMessage,
  inputType,
  register,
  registerType,
  errorMessage,
}: InputProps) => (
  <fieldset>
    <StyledTextField
      label={inputMessage}
      type={inputType}
      {...register(registerType)}
    />
    <StyledParagraph fontColor='red'>{errorMessage}</StyledParagraph>
  </fieldset>
);

export default Input;
