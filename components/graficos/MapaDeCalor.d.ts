export interface MapaDeCalorProps {
  linhas?: string[];
  colunas?: string[];
  valores?: number[][];
  tamanhoCelula?: number;
  formatar?: (valor: number) => string;
  legenda?: boolean;
  style?: React.CSSProperties;
}

export declare function MapaDeCalor(props: MapaDeCalorProps): JSX.Element;
