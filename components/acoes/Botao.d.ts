export interface BotaoProps {
  variante?: 'primario' | 'secundario' | 'texto' | 'perigo';
  tamanho?: 'pequeno' | 'medio' | 'grande';
  bloco?: boolean;
  desabilitado?: boolean;
  carregando?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Botao(props: BotaoProps): JSX.Element;
