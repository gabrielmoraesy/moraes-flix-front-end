import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const loginSchema = z.object({
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth()

    const handleLogin = async (data: LoginFormInputs) => {
        await login({
            email: data.email,
            password: data.password
        });
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col items-center gap-4">
            <Input
                type="email"
                placeholder="Digite seu email..."
                className="p-2 border border-gray-300 rounded w-full dark:text-white"
                {...register("email")}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

            <div className="relative w-full">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha..."
                    className="p-2 border border-gray-300 rounded w-full dark:text-white"
                    {...register("password")}
                />
                <div
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    {showPassword ? (
                        <AiFillEyeInvisible size={20} color="#575757" />
                    ) : (
                        <AiFillEye size={20} color="#575757" />
                    )}
                </div>
            </div>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

            <Button
                type="submit"
                className="w-full bg-primaryBlue p-2 rounded-lg text-white"
            >
                Entrar
            </Button>
        </form>
    )
}

export default LoginForm;
