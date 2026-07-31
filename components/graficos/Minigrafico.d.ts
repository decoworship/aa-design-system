export interface MinigraficoProps {
  dados?: number[];
  tipo?: 'linha' | 'barra';
  cor?: string;
  largura?: number | string;
  altura?: number;
  realceUltimo?: boolean;
  style?: React.CSSProperties;
}

export declare function Minigrafico(props: MinigraficoProps): JSX.Element | null;
