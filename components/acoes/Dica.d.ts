export interface DicaProps {
  texto: string;
  posicao?: 'cima' | 'baixo' | 'esquerda' | 'direita';
  children?: React.ReactNode;
}

export declare function Dica(props: DicaProps): JSX.Element;
