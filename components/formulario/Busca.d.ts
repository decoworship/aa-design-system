export interface BuscaProps {
  valor?: string;
  aoMudar?: (valor: string) => void;
  placeholder?: string;
  largura?: number | string;
  style?: React.CSSProperties;
}

export declare function Busca(props: BuscaProps): JSX.Element;
