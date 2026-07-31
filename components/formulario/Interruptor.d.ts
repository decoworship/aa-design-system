export interface InterruptorProps {
  rotulo?: React.ReactNode;
  descricao?: string;
  ligado?: boolean;
  aoMudar?: (ligado: boolean) => void;
  desabilitado?: boolean;
  style?: React.CSSProperties;
}

export declare function Interruptor(props: InterruptorProps): JSX.Element;
