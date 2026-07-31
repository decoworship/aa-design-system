/* global React */
export function Esqueleto({ linhas = 1, altura = 12, largura = '100%', formato = 'linha', style }) {
  const raio = formato === 'circulo' ? 999 : formato === 'bloco' ? 'var(--raio-medio)' : 'var(--raio-pequeno)';
  const itens = Array.from({ length: linhas });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {itens.map((_, i) => (
        <div key={i} style={{
          height: formato === 'circulo' ? altura : altura,
          width: i === itens.length - 1 && linhas > 1 ? '65%' : largura,
          background: 'var(--cor-superficie-2)', borderRadius: raio,
          animation: 'aa-pulso 1.4s ease-in-out infinite', animationDelay: (i * 0.12) + 's',
        }} />
      ))}
    </div>
  );
}
