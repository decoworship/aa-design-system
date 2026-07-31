export interface OpcaoMulti {
  valor: string;
  rotulo: string;
}

export interface MultiSelecaoProps {
  rotulo?: string;
  opcoes?: (OpcaoMulti | string)[];
  /** Valores escolhidos. Componente controlado. */
  valor?: string[];
  aoMudar?: (valores: string[]) => void;
  placeholder?: string;
  dica?: string;
  erro?: string;
  obrigatorio?: boolean;
  desabilitado?: boolean;
  /** Teto de escolhas. Ao bater, as não-marcadas ficam bloqueadas e a dica explica. */
  limite?: number;
  /** Quantas fichas mostrar antes de resumir em "+N". Padrão 3. */
  maxFichas?: number;
  style?: React.CSSProperties;
}

export declare function MultiSelecao(props: MultiSelecaoProps): JSX.Element;
