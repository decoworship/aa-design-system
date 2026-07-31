export interface CampoProps {
  rotulo?: string;
  valor?: string;
  aoMudar?: (valor: string) => void;
  placeholder?: string;
  dica?: string;
  erro?: string;
  tipo?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  obrigatorio?: boolean;
  desabilitado?: boolean;
  prefixo?: React.ReactNode;
  sufixo?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Campo(props: CampoProps): JSX.Element;
