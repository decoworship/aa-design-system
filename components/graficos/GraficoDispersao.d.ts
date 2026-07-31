export interface GraficoDispersaoProps {
  pontos?: Array<{ x: number; y: number; tamanho?: number; grupo?: number; cor?: string; rotulo?: string }>;
  altura?: number;
  rotuloX?: string;
  rotuloY?: string;
  formatarX?: (valor: number) => string;
  formatarY?: (valor: number) => string;
  tamanhoBolha?: boolean;
  style?: React.CSSProperties;
}

export declare function GraficoDispersao(props: GraficoDispersaoProps): JSX.Element;
