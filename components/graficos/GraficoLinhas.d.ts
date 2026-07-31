export interface GraficoLinhasProps {
  dados?: Array<{ rotulo: string; [serie: string]: string | number }>;
  series?: Array<{ chave: string; nome?: string; cor?: string }>;
  area?: boolean;
  altura?: number;
  mostrarGrade?: boolean;
  mostrarPontos?: boolean;
  mostrarLegenda?: boolean;
  formatar?: (valor: number) => string;
  referencia?: number;
  style?: React.CSSProperties;
}

export declare function GraficoLinhas(props: GraficoLinhasProps): JSX.Element;
