export interface GraficoMedidorProps {
  valor?: number;
  max?: number;
  rotulo?: string;
  tamanho?: number;
  faixas?: Array<{ de: number; ate: number; cor: string }>;
  formatar?: (valor: number) => string;
  style?: React.CSSProperties;
}

export declare function GraficoMedidor(props: GraficoMedidorProps): JSX.Element;
