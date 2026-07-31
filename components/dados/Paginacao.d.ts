export interface PaginacaoProps {
  pagina?: number;
  total?: number;
  aoMudar?: (pagina: number) => void;
  style?: React.CSSProperties;
}

export declare function Paginacao(props: PaginacaoProps): JSX.Element;
