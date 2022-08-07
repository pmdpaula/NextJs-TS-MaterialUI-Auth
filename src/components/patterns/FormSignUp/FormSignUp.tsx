// import * as yup from 'yup';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import globalDefinitions from '../../../config/globalDefinitions';
import { useIsMidOrHigerSizeScreen } from '../../../hooks/usefullHooks';
import AxSnackbar, {
  AxSnackbarProps,
} from '../../commons/AxSnackbar/AxSnackbar';
import { UserProps } from '../../wrappers/WebsitePage/context/AuthContext';
// import { UserProps } from '../../wrappers/WebsitePage/context/AuthContext';

type FormProps = {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

// const loginSchema = yup.object().shape({
//   usuario: yup
//     .string()
//     .required('"Usuario" é obrigatório')
//     .min(3, 'Preencha ao menos 3 caracteres'),
//   senha: yup
//     .string()
//     .required('"Senha" é obrigatória')
//     .min(8, 'Sua senha precisa ter ao menos 8 caracteres'),
// });

const LoginButton = styled(Button)`
  width: 15.2rem;
  height: 3rem;
  border-radius: 49px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
`;

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

interface FormSignUpProps {
  setIsSignUpMode: any;
}

const FormSignUp = ({ setIsSignUpMode }: FormSignUpProps): JSX.Element => {
  const [, setSubmissionStatus] = useState(formStates.DEFAULT);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const isSmallScreen = useIsMidOrHigerSizeScreen() ? undefined : 'small';

  const { alertTimes } = globalDefinitions;

  // eslint-disable-next-line no-console
  // console.log(submissionStatus);

  const [snackbarData, setSnackbarData] = useState<AxSnackbarProps>({
    id: '',
    severity: 'info',
    title: '',
    text: '',
  });

  const defaultValues: FormProps = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const { register, handleSubmit, getValues, control } = useForm<FormProps>({
    defaultValues,
  });

  type UserFormProps = UserProps & { passwordConfirmation: string };

  const onSubmit: SubmitHandler<UserFormProps> = (data) => {
    // console.log(JSON.stringify(data)); //! teste
    // setIsFormSubmited(true);

    fetch('http://localhost:4001/register', {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((serverResponse) => {
        // eslint-disable-next-line prettier/prettier
        const snackbarHorizontalPosition: SnackbarOrigin = isSmallScreen
          ? { vertical: 'bottom', horizontal: 'center' }
          : { vertical: 'bottom', horizontal: 'right' };

        if (serverResponse.ok) {
          setSnackbarData({
            id: 'CreateUserSuccess',
            anchorOrigin: snackbarHorizontalPosition,
            severity: 'success',
            title: 'Usuário cadastro',
            text: 'Usuário cadastrado com sucesso!',
          });
          setOpenAlert(true);

          setTimeout(() => {
            setIsSignUpMode(false);
          }, 1000);

          return serverResponse.json();
        }

        if (serverResponse.status === 409) {
          // setServerResponseStatus(409);

          setSnackbarData({
            id: 'CreateUserError',
            anchorOrigin: snackbarHorizontalPosition,
            severity: 'error',
            title: 'Erro de Cadastro',
            text: 'Já existe usuário com este e-mail.',
          });

          setOpenAlert(true);

          return serverResponse.json();
        }

        throw new Error('Não foi possível cadastrar o usuário agora :(');
      })
      .then(() => {
        setSubmissionStatus(formStates.DONE);
      })
      .catch((error) => {
        setSubmissionStatus(formStates.ERROR);
        throw new Error(error);
      });
  };

  return (
    <>
      <form
        id="signUpForm"
        className="signUpForm"
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginBottom: '1.5rem' }}
      >
        <Typography
          variant="h3"
          color="textSecondary"
          style={{ marginBottom: '1rem' }}
        >
          Sign up
        </Typography>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              // defaultValue={defaultValues.firstName}
              {...register('firstName', { required: true, minLength: 2 })}
              variant="outlined"
              label="Primeiro nome"
              size={isSmallScreen}
              autoComplete="given-name"
              // name="email"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <TextField
              // defaultValue={defaultValues.surname}
              {...register('surname', { required: true, minLength: 2 })}
              variant="outlined"
              label="Sobrenome"
              size={isSmallScreen}
              autoComplete="family-name"
              // name="email"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineTwoToneIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              // defaultValue={defaultValues.email}
              {...register('email', { required: true, minLength: 2 })}
              variant="outlined"
              label="E-mail"
              size={isSmallScreen}
              autoComplete="email"
              // name="email"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              // defaultValue={defaultValues.password}
              {...register('password', {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              variant="outlined"
              label="Senha"
              size={isSmallScreen}
              autoComplete="new-password"
              // name="email"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              // defaultValue={defaultValues.passwordConfirmation}
              {...register('passwordConfirmation', {
                required: 'Confirme a senha!',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || 'A senhas devem ser iguais';
                  },
                },
              })}
              variant="outlined"
              label="Confirme a senha"
              size={isSmallScreen}
              autoComplete="new-password"
              // name="email"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />

        <LoginButton
          variant="contained"
          color="primary"
          type="submit"
          value="Login"
        >
          Sign Up
        </LoginButton>
      </form>

      {openAlert && (
        <AxSnackbar
          id={snackbarData.id}
          // open={snackbarData.open}
          autoHideDuration={alertTimes.normal}
          anchorOrigin={snackbarData.anchorOrigin}
          severity={snackbarData.severity}
          title={snackbarData.title}
          text={snackbarData.text}
          setOpenAlert={setOpenAlert}
          openAlert={openAlert}
        />
      )}
    </>
  );
};

export default FormSignUp;
