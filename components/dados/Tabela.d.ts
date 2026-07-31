export interface TabelaColuna {
  chave: string;
  rotulo: string;
  numerica?: boolean;
  largura?: string | number;
  render?: (linha: any) => React.ReactNode;
}

export interface TabelaProps {
  colunas?: TabelaColuna[];
  linhas?: any[];
  ordenavel?: boolean;
  /** Texto mostrado quando `linhas` está vazio e o estado é 'pronto'. */
  vazio?: React.ReactNode;
  /** 'carregando' mostra esqueleto na mesma grade; 'erro' mostra recuperação. */
  estado?: 'pronto' | 'carregando' | 'erro';
  /** Mensagem de erro. Escreva o que aconteceu, não o código HTTP. */
  erro?: React.ReactNode;
  /** Se passado, o estado de erro ganha um botão "Tentar de novo". */
  aoTentarNovamente?: () => void;
  /** Quantas linhas de esqueleto desenhar. Use o tamanho típico da página. */
  linhasCarregando?: number;
  aoClicarLinha?: (linha: any) => void;
  /** id da linha em destaque — para tabela ao lado de painel de detalhe. */
  linhaAtiva?: string | number;
  style?: React.CSSProperties;
}

export declare function Tabela(props: TabelaProps): JSX.Element;
