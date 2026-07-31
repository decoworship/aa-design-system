export interface GraficoFunilProps {
  etapas?: Array<{ rotulo: string; valor: number; cor?: string }>;
  mostrarConversao?: boolean;
  formatar?: (valor: number) => string;
  style?: React.CSSProperties;
}

export declare function GraficoFunil(props: GraficoFunilProps): JSX.Element;
