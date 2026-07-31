export interface AreaTextoProps {
  rotulo?: string;
  valor?: string;
  aoMudar?: (valor: string) => void;
  placeholder?: string;
  dica?: string;
  erro?: string;
  linhas?: number;
  obrigatorio?: boolean;
  desabilitado?: boolean;
  style?: React.CSSProperties;
}

export declare function AreaTexto(props: AreaTextoProps): JSX.Element;
