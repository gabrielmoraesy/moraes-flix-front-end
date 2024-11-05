import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaRegFileAlt, FaCloud } from "react-icons/fa";
import { SiReact, SiNodedotjs, SiExpress, SiPostgresql, SiDocker, SiPrisma, SiTailwindcss, SiZod } from "react-icons/si";

export const About = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Sobre o <span className="text-[#0500f5] font-extrabold">MoraesFlix</span>
      </h1>
      <p className="text-base sm:text-lg mb-4">
        O MoraesFlix é uma aplicação de gerenciamento de filmes, permitindo que os usuários adicionem, editem e excluam seus filmes favoritos, além de deixarem avaliações. O projeto foi desenvolvido com tecnologias modernas:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li className="flex items-center mb-2">
          <SiReact className="text-2xl mr-2" />
          <SiTailwindcss className="text-2xl mr-2" />
          <span><strong>Front-end:</strong> React e Tailwind CSS.</span>
        </li>
        <li className="flex items-center mb-2">
          <SiNodedotjs className="text-2xl mr-2" />
          <span><strong>Back-end:</strong> Node.js</span>
        </li>
        <li className="flex items-center mb-2">
          <SiExpress className="text-2xl mr-2" />
          <span><strong>Framework:</strong> Express</span>
        </li>
        <li className="flex items-center mb-2">
          <SiPrisma className="text-2xl mr-2" />
          <SiPostgresql className="text-2xl mr-2" />
          <span><strong>Banco de Dados:</strong> Prisma e PostgreSQL</span>
        </li>
        <li className="flex items-center mb-2">
          <SiZod className="text-2xl mr-2" />
          <FaRegFileAlt className="text-2xl mr-2" />
          <span><strong>Validações:</strong> Zod e React Hook Form</span>
        </li>
        <li className="flex items-center mb-2">
          <FaCloud className="text-2xl mr-2" />
          <span><strong>Requisições HTTP:</strong> Axios</span>
        </li>
        <li className="flex items-center mb-2">
          <SiDocker className="text-2xl mr-2" />
          <span><strong>Containerização:</strong> Docker</span>
        </li>
      </ul>
      <p className="text-base sm:text-lg mb-4">
        Com uma interface amigável, o MoraesFlix facilita a gestão de suas coleções de filmes e avaliações.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <Link to="https://github.com/gabrielmoraesy" target="_blank" className="flex items-center">
          <FaGithub className="text-2xl" />
          <span className="ml-2">Github</span>
        </Link>
        <Link to="https://www.linkedin.com/in/gabrielmoraespires/" target="_blank" className="flex items-center">
          <FaLinkedin className="text-2xl" />
          <span className="ml-2">LinkedIn</span>
        </Link>
        <Link to="https://www.instagram.com/moraesdev/" target="_blank" className="flex items-center">
          <FaInstagram className="text-2xl" />
          <span className="ml-2">Instagram</span>
        </Link>
        <Link to="mailto:ygabrielmoraes@gmail.com" className="flex items-center" target="_blank">
          <FaEnvelope className="text-2xl" />
          <span className="ml-2">Email</span>
        </Link>
        <Link to="tel:+5521964277805" className="flex items-center">
          <FaPhone className="text-2xl" />
          <span className="ml-2">Telefone</span>
        </Link>
        <Link to="https://wa.me/5521964277805" className="flex items-center" target="_blank">
          <FaPhone className="text-2xl" />
          <span className="ml-2">WhatsApp</span>
        </Link>
      </div>
    </div>
  );
};
