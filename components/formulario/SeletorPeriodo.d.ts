export interface Periodo {
  /** Atalho escolhido, ou 'custom' quando veio do calendário. */
  chave: 'hoje' | '7d' | '30d' | 'mes' | 'ano' | 'custom';
  inicio: Date;
  fim: Date;
  comparar?: boolean;
  /** Preenchido automaticamente quando `comparar` é true. */
  comparacao?: { inicio: Date; fim: Date } | null;
}

export interface SeletorPeriodoAtalho {
  chave: string;
  rotulo: string;
  dias?: number;
  mes?: boolean;
  ano?: boolean;
}

export interface SeletorPeriodoProps {
  valor?: Periodo;
  aoMudar?: (valor: Periodo) => void;
  /** Mostra "Comparar com período anterior". Ligado por padrão. */
  comparavel?: boolean;
  atalhos?: SeletorPeriodoAtalho[];
  /** Injetável para teste e para preview com data fixa. */
  hoje?: Date;
  style?: React.CSSProperties;
}

export declare const ATALHOS: SeletorPeriodoAtalho[];
export declare function periodoDoAtalho(chave: string, hoje?: Date): { inicio: Date; fim: Date } | null;
/** Mesma duração, colado antes do início. */
export declare function periodoAnterior(p: { inicio: Date; fim: Date }): { inicio: Date; fim: Date };

/**
 * As duas funções também viajam penduradas no componente
 * (`SeletorPeriodo.periodoDoAtalho`), porque o bundle global só expõe
 * nomes com inicial maiúscula.
 */
export declare function SeletorPeriodo(props: SeletorPeriodoProps): JSX.Element & {
  periodoDoAtalho: typeof periodoDoAtalho;
  periodoAnterior: typeof periodoAnterior;
  ATALHOS: typeof ATALHOS;
};
