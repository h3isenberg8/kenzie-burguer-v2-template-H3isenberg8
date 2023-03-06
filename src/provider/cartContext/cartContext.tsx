import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { toast } from 'react-hot-toast';
import { Api } from '../../services/Api';

interface ICartContext {
  cartModalState: boolean;
  setCartModalState: Dispatch<SetStateAction<boolean>>;
  foodsToRender: IFoodItem[];
  foodToAddInCart: (uuid: number) => void;
  foodsInCart: IFoodItem[];
  setFoodsInCart: Dispatch<SetStateAction<IFoodItem[]>>;
  removeFoodInCart: (number: number) => void;
  getItems: (searchValue?: string) => Promise<void>;
  sumAllValues: () => number;
}

export interface IFoodItem {
  name?: string;
  category?: string;
  price?: number | string;
  img?: string;
  id?: number | undefined;
  type?: string;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartModalState, setCartModalState] = useState<boolean>(false);
  const [foodsToRender, setFoodsToRender] = useState<IFoodItem[]>([]);

  const getToken = (): string | false => {
    const getData = JSON.parse(localStorage.getItem('@tokenAndID')) || null;
    if (getData != null) {
      const { token } = getData;
      return token;
    } else {
      return false;
    }
  };

  const getItems = async (searchValue?: string): Promise<void> => {
    const token = getToken();

    try {
      const response = await Api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof searchValue === 'undefined') {
        setFoodsToRender(response.data);
      } else {
        const filteredData = response.data.filter(
          (food: IFoodItem) =>
            food.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            food.category.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFoodsToRender(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [foodsInCart, setFoodsInCart] = useState<IFoodItem[]>([]);

  const removeFoodInCart = (number: number): void => {
    const leftFoods = foodsInCart.filter((e) => {
      if (e.id !== parseInt(number)) {
        return e;
      }
    });
    setFoodsInCart(leftFoods);
    toast.success('Item removido com sucesso', {
      position: 'top-right',
      duration: 2000,
    });
  };

  const foodToAddInCart = (uuid: number): void => {
    const response = foodsInCart.filter((e) => {
      if (e.id == parseInt(uuid)) {
        return e;
      }
    });

    if (response.length > 0) {
      toast.error('Ítem já está na sacola', {
        position: 'top-right',
        duration: 2000,
      });
    } else {
      const selectedFood = foodsToRender.filter((e) => {
        if (e.id == parseInt(uuid)) {
          return e;
        }
      });

      setFoodsInCart([...foodsInCart, ...selectedFood]);

      toast.success('Ítem adicionado com sucesso', {
        position: 'top-right',
        duration: 2000,
      });
    }
  };

  const sumAllValues = (): number => {
    return foodsInCart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartModalState,
        setCartModalState,
        foodsToRender,
        foodToAddInCart,
        foodsInCart,
        setFoodsInCart,
        removeFoodInCart,
        getItems,
        sumAllValues,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
