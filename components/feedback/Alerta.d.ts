export interface AlertaProps {
  variante?: 'info' | 'sucesso' | 'atencao' | 'erro';
  titulo?: string;
  children?: React.ReactNode;
  aoFechar?: () => void;
  style?: React.CSSProperties;
}

export declare function Alerta(props: AlertaProps): JSX.Element;
