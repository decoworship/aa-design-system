export interface EtiquetaProps {
  variante?: 'neutro' | 'info' | 'sucesso' | 'atencao' | 'erro' | 'destaque';
  ponto?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Etiqueta(props: EtiquetaProps): JSX.Element;
