export interface CalendarioIntervalo {
  inicio: Date | null;
  /** null enquanto a pessoa escolheu só a primeira ponta. */
  fim: Date | null;
}

export interface CalendarioProps {
  modo?: 'dia' | 'intervalo';
  valor?: Date | CalendarioIntervalo;
  aoSelecionar?: (valor: Date | CalendarioIntervalo) => void;
  min?: Date;
  max?: Date;
  /** Mês aberto na primeira renderização. Padrão: o mês de `valor`, ou o atual. */
  mesInicial?: Date;
  /** Ocupa 100% do contêiner até 266px. Passe `maxWidth` por `style` para mudar o teto. */
  style?: React.CSSProperties;
}

export declare function Calendario(props: CalendarioProps): JSX.Element;
