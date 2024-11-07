import { api } from '@/services/api';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface IAuthContext {
    user: IUser | null;
    token: string;
    register: (userData: IUserRegister) => Promise<void>;
    login: (userData: IUserLogin) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthProviderProps {
    children: ReactNode;
}

interface IUser {
    email: string;
    name: string;
    id: string;
}

interface IUserLogin {
    email: string;
    password: string;
}

interface IUserRegister {
    name: string;
    email: string;
    password: string;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const register = async (userData: IUserRegister) => {
        try {
            await api.post("/auth/register", {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            await login({
                email: userData.email,
                password: userData.password
            });

            toast.success("Conta criada com sucesso");
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error("Erro ao criar conta");
            }
        }
    };

    const login = async (userData: IUserLogin) => {
        try {
            const res = await api.post("/auth/login", {
                email: userData.email,
                password: userData.password
            });

            setUser(res.data.user);
            setToken(res.data.token);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error("Erro ao entrar na conta");
            }
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
