export interface CartaoProps {
  titulo?: React.ReactNode;
  rotulo?: string;
  acoes?: React.ReactNode;
  rodape?: React.ReactNode;
  compacto?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Cartao(props: CartaoProps): JSX.Element;
