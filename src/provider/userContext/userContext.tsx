import toast from 'react-hot-toast';
import { createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';

interface UserProviderProps {
  children: ReactNode;
}

export interface IUserData {
  Email: string;
  Password: string;
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

interface IContextData {
  loginUser: (userData: IUserData) => Promise<void>;
  registerUser: (data: IUserData) => Promise<void>;
  checkIfUserHasAlreadyLogged: () => Promise<boolean>;
  getId: () => string | number | false;
  getToken: () => string | false;
}

interface ILocalStorageData {
  id: string | number;
  token: string;
}

export const UserContext = createContext<IContextData>({} as IContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();

  const getId = (): string | number | false => {
    const getData: ILocalStorageData | null =
      JSON.parse(localStorage.getItem('@tokenAndID')) || null;
    if (getData != null) {
      const { id } = getData;
      return id;
    } else {
      return false;
    }
  };

  async function moveUser() {
    const state = await checkIfUserHasAlreadyLogged();

    if (state == true) {
      navigate('/shop');
    }
  }

  const getToken = (): string | false => {
    const getData: ILocalStorageData | null =
      JSON.parse(localStorage.getItem('@tokenAndID')) || null;
    if (getData != null) {
      const { token } = getData;
      return token;
    } else {
      return false;
    }
  };

  const loginUser = async (userData: IUserData): Promise<void> => {
    try {
      const response = await Api.post('/login', userData);
      localStorage.setItem(
        '@tokenAndID',
        JSON.stringify({
          token: response.data.accessToken,
          id: response.data.user.id,
        })
      );

      toast.success('Usuário logado com sucesso', {
        position: 'top-right',
        duration: 2000,
      });

      navigate('/shop');
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-right',
        duration: 2000,
      });
    }
  };

  const registerUser = async (data: IUserData): Promise<void> => {
    try {
      const response = await Api.post('/users', data);
      toast.success('User successfully created', {
        position: 'top-right',
        duration: 2000,
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-right',
        duration: 2000,
      });
    }
  };

  const checkIfUserHasAlreadyLogged = async (): Promise<boolean> => {
    const token = getToken();

    const id = getId();

    try {
      const response = await Api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        getToken,
        getId,
        navigate,
        checkIfUserHasAlreadyLogged,
        moveUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
