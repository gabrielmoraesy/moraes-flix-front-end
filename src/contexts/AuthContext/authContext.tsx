import axios, { AxiosError } from 'axios';
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
    id: string
}

interface IUserLogin {
    email: string;
    password: string;
}

interface IUserRegister {
    name: string
    email: string;
    password: string;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    console.log("user", user)
    console.log("token", token)

    const register = async (userData: IUserRegister) => {
        try {
            await axios.post("http://localhost:3333/auth/register", {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            await login({
                email: userData.email,
                password: userData.password
            });

            toast.success("Conta criada com sucesso")
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                console.log(error)
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error("Erro ao criar conta");
            }
        }
    };

    const login = async (userData: IUserLogin) => {
        try {
            const res = await axios.post("http://localhost:3333/auth/login", {
                email: userData.email,
                password: userData.password
            });

            setUser(res.data.user);
            setToken(res.data.token);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.name);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('userId', res.data.user.id);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error("Erro ao entrar na conta");
            }
        }

    }

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
    };

    useEffect(() => {
        const userObject = {
            name: localStorage.getItem('username') || '',
            email: localStorage.getItem('email') || '',
            id: localStorage.getItem('userId') || ''
        }

        setUser(userObject)
    }, [])

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
