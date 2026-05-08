/* @jsx React.createElement */
const { useState } = React;

// ============== SHARED PRIMITIVES ==============
const COLORS = {
  brasa: '#C06018', brasaDark: '#974A12', brasaMin: '#F9EDE3',
  carvao: '#181614', grafite: '#3D3A36', pedra: '#8C8880',
  areia: '#E8E4DC', offwhite: '#F5F2EC',
  resultado: '#1A7A4A', critico: '#B52A2A', informacao: '#3A6FBF',
};

// Resolve asset paths whether this kit is loaded from /ui_kits/meta-ads/, /ui_kits/<other>/, /slides/ or root
const ASSETS = (() => {
  const p = location.pathname;
  if (p.includes('/ui_kits/')) return '../../assets/';
  if (p.includes('/slides/')) return '../assets/';
  if (p.includes('/preview/')) return '../assets/';
  return 'assets/';
})();

// Lockup vetorizado inline — sem PNGs com fundo embutido.
// Símbolo: 3 paralelogramas vetorizados do logo original (lados verticais, topo/base com slope -0.48).
// viewBox 0 0 1300 240 → razão 5.417 : 1
function LogoLockup({ dark = false, height = 28, divider = true }) {
  const fg = dark ? COLORS.offwhite : COLORS.carvao;
  const accent = COLORS.brasa;
  const width = height * (1300 / 240);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1300 240"
      width={width}
      height={height}
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Hurtz"
    >
      <g fill={fg}>
        <polygon points="55,79 215,2 215,39 55,116" />
        <polygon points="2,182 271,53 271,89 2,218" />
        <polygon points="121,201 301,115 301,152 121,237" />
      </g>
      {divider && <rect x="380" y="20" width="6" height="200" fill={accent} />}
      <text x="450" y="178" fontFamily="Inter, Helvetica, Arial, sans-serif" fontWeight="700" fontSize="170" letterSpacing="14" fill={fg}>HURTZ</text>
    </svg>
  );
}

function LogoSymbol({ size = 24, color = COLORS.carvao, dark = false }) {
  const fill = dark ? COLORS.offwhite : color;
  // Símbolo vetorizado: viewBox 0 0 304 240 (razão ~1.267)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 304 240"
      height={size}
      width={size * (304 / 240)}
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <g fill={fill}>
        <polygon points="55,79 215,2 215,39 55,116" />
        <polygon points="2,182 271,53 271,89 2,218" />
        <polygon points="121,201 301,115 301,152 121,237" />
      </g>
    </svg>
  );
}

// ============== META ADS CREATIVE ==============
function MetaAdLight() {
  return (
    <div style={{
      width: 360, height: 360, background: COLORS.offwhite, padding: 28,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      border: `1px solid ${COLORS.areia}`, fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <LogoLockup height={28} />
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.pedra }}>EXCLUSIVO · CONSÓRCIO</span>
      </div>
      <div>
        <div style={{ width: 28, height: 2, background: COLORS.brasa, marginBottom: 14 }} />
        <h2 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.1, color: COLORS.carvao, margin: 0, letterSpacing: '-0.005em' }}>
          50 leads<br />qualificados<br />por dia.
        </h2>
        <p style={{ fontSize: 13, color: COLORS.grafite, marginTop: 12, lineHeight: 1.5, maxWidth: 260 }}>
          Cada um com ficha completa. Pronto para o SDR ligar.
        </p>
      </div>
      <button style={{
        background: COLORS.brasa, color: '#fff', border: 'none', padding: '12px 18px',
        fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', borderRadius: 4, alignSelf: 'flex-start',
        fontFamily: 'inherit', cursor: 'pointer',
      }}>QUERO A PROPOSTA →</button>
    </div>
  );
}

function MetaAdDark() {
  return (
    <div style={{
      width: 360, height: 360, background: COLORS.carvao, padding: 28,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LogoLockup dark height={28} />
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(245,242,236,0.5)' }}>RECORDE NACIONAL</span>
      </div>
      <div>
        <div style={{ width: 28, height: 2, background: COLORS.brasa, marginBottom: 14 }} />
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 0.95, color: COLORS.offwhite, letterSpacing: '-0.02em' }}>
          R$14<span style={{ color: COLORS.brasa }}>M</span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(245,242,236,0.75)', marginTop: 14, lineHeight: 1.5, maxWidth: 280 }}>
          é o que <strong style={{ color: COLORS.offwhite }}>Gabriela vende por mês</strong> com a operação Hurtz. Sem milagre — método.
        </p>
      </div>
      <button style={{
        background: COLORS.brasa, color: '#fff', border: 'none', padding: '12px 18px',
        fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', borderRadius: 4, alignSelf: 'flex-start',
        fontFamily: 'inherit', cursor: 'pointer',
      }}>VER O MÉTODO →</button>
    </div>
  );
}

function MetaAdStat() {
  return (
    <div style={{
      width: 360, height: 360, background: COLORS.offwhite, padding: 28,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      border: `1px solid ${COLORS.areia}`, fontFamily: 'Inter, sans-serif',
    }}>
      <LogoLockup height={28} />
      <div style={{ textAlign: 'left' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.brasa, textTransform: 'uppercase' }}>Operação · Abril 2026</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
          <div>
            <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.carvao, lineHeight: 1 }}>R$34<span style={{ fontSize: 18, color: COLORS.brasa }}>M</span></div>
            <div style={{ fontSize: 11, color: COLORS.grafite, marginTop: 6 }}>vendas/mês dos clientes ativos</div>
          </div>
          <div>
            <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.carvao, lineHeight: 1 }}>1.482</div>
            <div style={{ fontSize: 11, color: COLORS.grafite, marginTop: 6 }}>leads qualificados em 30 dias</div>
          </div>
          <div>
            <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.carvao, lineHeight: 1 }}>418</div>
            <div style={{ fontSize: 11, color: COLORS.grafite, marginTop: 6 }}>fichas completas no CRM</div>
          </div>
          <div>
            <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.carvao, lineHeight: 1 }}>22<span style={{ fontSize: 20, color: COLORS.brasa }}>%</span></div>
            <div style={{ fontSize: 11, color: COLORS.grafite, marginTop: 6 }}>conversão SDR → Closer</div>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: COLORS.grafite, margin: 0, lineHeight: 1.5 }}>
        Cirurgiões, não generalistas. <strong style={{ color: COLORS.carvao }}>Hurtz Company</strong> — exclusivo p/ representantes de consórcio.
      </p>
    </div>
  );
}

window.MetaAdLight = MetaAdLight;
window.MetaAdDark = MetaAdDark;
window.MetaAdStat = MetaAdStat;
window.LogoLockup = LogoLockup;
window.LogoSymbol = LogoSymbol;
window.HURTZ_COLORS = COLORS;
