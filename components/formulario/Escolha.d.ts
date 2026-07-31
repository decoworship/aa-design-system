export interface EscolhaProps {
  tipo?: 'caixa' | 'radio';
  rotulo?: React.ReactNode;
  descricao?: string;
  marcado?: boolean;
  aoMudar?: (marcado: boolean) => void;
  nome?: string;
  valor?: string;
  desabilitado?: boolean;
  style?: React.CSSProperties;
}

export declare function Escolha(props: EscolhaProps): JSX.Element;
