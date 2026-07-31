export interface AvisoProps {
  variante?: 'info' | 'sucesso' | 'atencao' | 'erro';
  titulo?: string;
  mensagem?: string;
  aoFechar?: () => void;
  style?: React.CSSProperties;
}

export declare function Aviso(props: AvisoProps): JSX.Element;
