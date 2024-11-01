import { TypeAnimation } from "react-type-animation";

export const DynamicPlaceholders = () => {
  const array = [
    "Duna: Parte Dois",
    "Furiosa",
    "Sobre Ervas Secas",
    "Zona de Interesse",
    "Fronteira Verde",
    "Homem Diferente",
    "Asas Longas",
    "Assassino",
    "O Gosto das Coisas",
    "Flipside",
    "Fantasma",
    "Um Lugar Chamado Casa",
    "Uma Mulher Que Viveu",
    "O Químico",
    "Sangue",
    "Caçador de Bravos",
    "Um Mundo Aparte",
    "Lado Bom",
    "Desaparecido",
    "A Face da Verdade",
    "Passado Sombrio",
    "O Mergulhador",
    "Mundo Selvagem"
  ];

  // Adiciona 1500 após cada item, exceto o último
  const sequence = array.flatMap((item, index) => {
    return index === array.length - 1 ? [item] : [item, 1500];
  });

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={1}
      style={{ fontSize: "16px", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};
