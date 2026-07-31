export interface AbasProps {
  abas?: Array<string | { id: string; rotulo: string; contagem?: number }>;
  ativa?: string;
  aoMudar?: (id: string) => void;
  style?: React.CSSProperties;
}

export declare function Abas(props: AbasProps): JSX.Element;
