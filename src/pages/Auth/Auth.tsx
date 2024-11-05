import LoginForm from "@/components/Form/LoginForm/LoginForm";
import RegisterForm from "@/components/Form/RegisterForm/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Auth = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen max-w-4xl mx-auto font-sans bg-white text-black dark:bg-transparent">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold dark:text-white">Acesse sua conta</h1>
        <p className="text-lg mb-5 dark:text-white">
          Faça login com sua conta Google para ter acesso às funcionalidades do Gestão de Projetos!
        </p>

        <Tabs defaultValue="Entrar" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="Entrar" className="w-[50%]">Entrar</TabsTrigger>
            <TabsTrigger value="Cadastrar" className="w-[50%]">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="Entrar" className="mt-4">
            <LoginForm />
          </TabsContent>
          <TabsContent value="Cadastrar" className="mt-4">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
