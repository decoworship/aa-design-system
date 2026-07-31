export interface GraficoRoscaProps {
  dados?: Array<{ rotulo: string; valor: number; cor?: string }>;
  rosca?: boolean;
  tamanho?: number;
  legenda?: boolean;
  centroRotulo?: string;
  centroValor?: React.ReactNode;
  formatar?: (valor: number) => string;
  style?: React.CSSProperties;
}

export declare function GraficoRosca(props: GraficoRoscaProps): JSX.Element;
