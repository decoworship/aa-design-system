export interface ModalProps {
  aberto?: boolean;
  titulo?: string;
  rotulo?: string;
  aoFechar?: () => void;
  acoes?: React.ReactNode;
  largura?: number | string;
  children?: React.ReactNode;
}

export declare function Modal(props: ModalProps): JSX.Element | null;
