export interface MenuSuspensoProps {
  gatilho?: React.ReactNode;
  rotulo?: string;
  itens?: Array<{ id?: string; rotulo?: string; perigo?: boolean; separador?: boolean }>;
  aoEscolher?: (item: any) => void;
  alinhamento?: 'esquerda' | 'direita';
  style?: React.CSSProperties;
}

export declare function MenuSuspenso(props: MenuSuspensoProps): JSX.Element;
