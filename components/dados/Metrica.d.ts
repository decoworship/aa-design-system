export interface MetricaProps {
  rotulo: string;
  valor: React.ReactNode;
  delta?: string;
  tendencia?: 'alta' | 'baixa' | 'neutra' | 'atencao';
  serie?: number[];
  unidade?: string;
  style?: React.CSSProperties;
}

export declare function Metrica(props: MetricaProps): JSX.Element;
