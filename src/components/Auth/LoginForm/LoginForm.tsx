import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
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
                className="p-2 border border-gray-300 rounded w-full"
                {...register("email")}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

            <Input
                type="password"
                placeholder="Digite sua senha..."
                className="p-2 border border-gray-300 rounded w-full"
                {...register("password")}
            />
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

export default LoginForm