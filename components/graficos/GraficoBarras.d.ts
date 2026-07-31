export interface GraficoBarrasProps {
  dados?: Array<{ rotulo: string; [serie: string]: string | number }>;
  series?: Array<{ chave: string; nome?: string; cor?: string }>;
  empilhado?: boolean;
  orientacao?: 'vertical' | 'horizontal';
  altura?: number;
  mostrarGrade?: boolean;
  mostrarLegenda?: boolean;
  formatar?: (valor: number) => string;
  realce?: string;
  style?: React.CSSProperties;
}

export declare function GraficoBarras(props: GraficoBarrasProps): JSX.Element;
