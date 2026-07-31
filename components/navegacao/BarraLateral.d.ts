export interface BarraLateralProps {
  marca?: string;
  subtitulo?: string;
  grupos?: Array<{ rotulo?: string; itens: Array<{ id: string; rotulo: string; contagem?: number }> }>;
  ativo?: string;
  aoNavegar?: (id: string) => void;
  rodape?: React.ReactNode;
  largura?: number;
  style?: React.CSSProperties;
}

export declare function BarraLateral(props: BarraLateralProps): JSX.Element;
