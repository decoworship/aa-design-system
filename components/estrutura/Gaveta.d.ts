export interface GavetaProps {
  aberta?: boolean;
  /** 'baixo' é a variante mobile: mesma gaveta subindo do rodapé. */
  lado?: 'direita' | 'esquerda' | 'baixo';
  titulo?: string;
  /** Sobretítulo em caixa alta, acima do título. */
  rotulo?: string;
  aoFechar?: () => void;
  /** Largura em px para os lados; ignorada quando lado="baixo". Padrão 400. */
  largura?: number | string;
  /** Altura quando lado="baixo". Padrão '70vh'. */
  altura?: number | string;
  /** Botões do rodapé fixo. */
  acoes?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Gaveta(props: GavetaProps): JSX.Element | null;
