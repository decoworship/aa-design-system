export interface EsqueletoProps {
  linhas?: number;
  altura?: number;
  largura?: number | string;
  formato?: 'linha' | 'bloco' | 'circulo';
  style?: React.CSSProperties;
}

export declare function Esqueleto(props: EsqueletoProps): JSX.Element;
