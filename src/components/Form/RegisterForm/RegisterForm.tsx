import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register: createAccount } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const handleRegister = async (data: RegisterFormInputs) => {
        await createAccount({
            name: data.name,
            email: data.email,
            password: data.password
        });
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col items-center gap-4">
            <Input
                type="text"
                placeholder="Digite seu nome..."
                className="p-2 border border-gray-300 rounded w-full dark:text-white"
                {...register("name")}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}

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
                Cadastrar
            </Button>
        </form>
    )
}

export default RegisterForm