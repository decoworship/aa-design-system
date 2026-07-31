export interface SelecaoProps {
  rotulo?: string;
  valor?: string;
  aoMudar?: (valor: string) => void;
  opcoes?: Array<string | { valor: string; rotulo: string }>;
  placeholder?: string;
  dica?: string;
  erro?: string;
  obrigatorio?: boolean;
  desabilitado?: boolean;
  style?: React.CSSProperties;
}

export declare function Selecao(props: SelecaoProps): JSX.Element;
