export interface MigalhasProps {
  itens?: Array<string | { rotulo: string; href?: string }>;
  aoNavegar?: (item: any, indice: number) => void;
  style?: React.CSSProperties;
}

export declare function Migalhas(props: MigalhasProps): JSX.Element;
