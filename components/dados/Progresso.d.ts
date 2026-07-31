export interface ProgressoProps {
  valor?: number;
  max?: number;
  rotulo?: string;
  formato?: 'barra' | 'anel';
  cor?: string;
  tamanho?: number;
  mostrarValor?: boolean;
  style?: React.CSSProperties;
}

export declare function Progresso(props: ProgressoProps): JSX.Element;
