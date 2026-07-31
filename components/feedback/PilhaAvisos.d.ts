export interface AvisoDaPilha {
  id: number | string;
  variante?: 'info' | 'sucesso' | 'atencao' | 'erro';
  titulo?: string;
  mensagem?: string;
  /** Um aviso com ação não some sozinho — dá tempo de clicar. */
  acao?: { rotulo: string; ao?: () => void };
  /** Sobrescreve a duração da pilha, em ms. */
  duracao?: number;
}

export interface PilhaAvisosProps {
  avisos?: AvisoDaPilha[];
  aoDispensar?: (id: number | string) => void;
  canto?: 'inferior-direito' | 'inferior-esquerdo' | 'superior-direito' | 'superior-esquerdo';
  /** Padrão 5000. Avisos de erro ignoram: quem errou precisa ler. */
  duracao?: number;
  style?: React.CSSProperties;
}

export interface ControleDeAvisos {
  avisos: AvisoDaPilha[];
  avisar: (aviso: Omit<AvisoDaPilha, 'id'>) => number;
  dispensar: (id: number | string) => void;
}

/** Fila com limite: o mais novo empurra o mais antigo.
 *  `Avisos.usar()` é o nome público — o bundle só expõe nomes com maiúscula. */
export declare const Avisos: {
  usar(opcoes?: { limite?: number; duracao?: number }): ControleDeAvisos;
};

export declare function PilhaAvisos(props: PilhaAvisosProps): JSX.Element;
