/* @jsx React.createElement */
const SC = window.HURTZ_COLORS;
const SLogoLockup = window.LogoLockup;
const SLogoSymbol = window.LogoSymbol;

const slideBase = {
  width: 1920, height: 1080, fontFamily: 'Inter, sans-serif',
  display: 'flex', flexDirection: 'column', position: 'relative',
  overflow: 'hidden',
};

function SlideFooter({ light = true, n }) {
  const c = light ? SC.pedra : 'rgba(245,242,236,0.5)';
  return (
    <div style={{
      position: 'absolute', left: 80, right: 80, bottom: 48,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 16, color: c, letterSpacing: '0.06em',
    }}>
      <SLogoSymbol size={22} color={light ? SC.carvao : SC.offwhite} />
      <span>HURTZ · {n}</span>
    </div>
  );
}

function TitleSlide() {
  return (
    <section data-screen-label="01 Title" style={{ ...slideBase, background: SC.carvao, padding: 96, color: SC.offwhite, justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SLogoLockup dark height={48} />
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(245,242,236,0.55)' }}>DECK COMERCIAL · 04 / 2026</span>
      </div>
      <div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color: SC.brasa, textTransform: 'uppercase' }}>Operação de aquisição</span>
        <div style={{ width: 96, height: 3, background: SC.brasa, margin: '32px 0 40px' }} />
        <h1 style={{ fontSize: 180, fontWeight: 700, lineHeight: 0.92, margin: 0, letterSpacing: '-0.02em' }}>
          Cirurgiões,<br/>não generalistas.
        </h1>
        <p style={{ fontSize: 28, color: 'rgba(245,242,236,0.7)', marginTop: 40, maxWidth: 1100, lineHeight: 1.45 }}>
          A única assessoria de marketing exclusiva para representantes de consórcio.
        </p>
      </div>
      <div style={{ fontSize: 14, color: 'rgba(245,242,236,0.4)', letterSpacing: '0.16em' }}>HURTZ COMPANY · PARAUAPEBAS, PA</div>
    </section>
  );
}

function BigQuoteSlide() {
  return (
    <section data-screen-label="02 Big Quote" style={{ ...slideBase, background: SC.offwhite, padding: 96, justifyContent: 'center' }}>
      <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color: SC.brasa, textTransform: 'uppercase' }}>Promessa</span>
      <div style={{ width: 96, height: 3, background: SC.brasa, margin: '32px 0 40px' }} />
      <h2 style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.1, color: SC.carvao, margin: 0, maxWidth: 1500, letterSpacing: '-0.01em' }}>
        A Hurtz não é a agência mais barata do mercado de consórcio.
      </h2>
      <p style={{ fontSize: 36, color: SC.grafite, marginTop: 40, lineHeight: 1.4, maxWidth: 1400 }}>
        É a única que você vai querer quando parar de aceitar resultado mediano.
      </p>
      <SlideFooter n="02" />
    </section>
  );
}

function StatsSlide() {
  const stats = [
    ['R$34', 'M', 'em vendas/mês — clientes ativos'],
    ['1.482', '', 'leads qualificados em 30 dias'],
    ['R$14', 'M', 'recorde Gabriela · cliente Hurtz'],
    ['22', '%', 'conversão SDR → Closer'],
  ];
  return (
    <section data-screen-label="03 Numbers" style={{ ...slideBase, background: SC.offwhite, padding: 96 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color: SC.brasa, textTransform: 'uppercase' }}>03 · Prova</span>
          <div style={{ width: 96, height: 3, background: SC.brasa, margin: '32px 0 40px' }} />
          <h2 style={{ fontSize: 88, fontWeight: 700, color: SC.carvao, margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>Os números<br/>falam por nós.</h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px 80px', marginTop: 80, maxWidth: 1500 }}>
        {stats.map(([n, suf, lbl]) => (
          <div key={lbl}>
            <div style={{ width: 40, height: 2, background: SC.brasa, marginBottom: 18 }} />
            <div style={{ fontSize: 144, fontWeight: 700, lineHeight: 0.95, color: SC.carvao, letterSpacing: '-0.02em' }}>
              {n}<span style={{ color: SC.brasa, fontSize: 80 }}>{suf}</span>
            </div>
            <div style={{ fontSize: 22, color: SC.grafite, marginTop: 18, lineHeight: 1.4 }}>{lbl}</div>
          </div>
        ))}
      </div>
      <SlideFooter n="03" />
    </section>
  );
}

function ComparisonSlide() {
  return (
    <section data-screen-label="04 Comparison" style={{ ...slideBase, background: SC.offwhite, padding: 96 }}>
      <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color: SC.brasa, textTransform: 'uppercase' }}>04 · Diferença</span>
      <div style={{ width: 96, height: 3, background: SC.brasa, margin: '32px 0 40px' }} />
      <h2 style={{ fontSize: 88, fontWeight: 700, color: SC.carvao, margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>Agência comum vs. Hurtz.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginTop: 64, border: `1.5px solid ${SC.areia}`, background: '#fff' }}>
        {[
          ['AGÊNCIA COMUM', SC.pedra, ['Atende qualquer nicho', 'Vende tráfego, métrica vaga', 'Lead bruto · sem qualificação', 'Promete "resultados expressivos"', 'Fidelidade longa']],
          ['HURTZ', SC.brasa, ['Exclusivo p/ consórcio', 'Operação de aquisição completa', 'Lead qualificado · ficha pronta', 'Mostra número antes do adjetivo', 'Mês a mês · sem fidelidade']],
        ].map(([title, color, items]) => (
          <div key={title} style={{ padding: 56, borderLeft: title === 'HURTZ' ? `1.5px solid ${SC.areia}` : 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color }}>{title}</div>
            <ul style={{ marginTop: 32, padding: 0, listStyle: 'none' }}>
              {items.map(t => (
                <li key={t} style={{ fontSize: 28, color: title === 'HURTZ' ? SC.carvao : SC.grafite, padding: '18px 0 18px 32px', position: 'relative', borderBottom: `1px solid ${SC.areia}`, lineHeight: 1.4 }}>
                  <span style={{ position: 'absolute', left: 0, top: 30, width: 16, height: 2, background: color }} />{t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SlideFooter n="04" />
    </section>
  );
}

function CTASlide() {
  return (
    <section data-screen-label="05 CTA" style={{ ...slideBase, background: SC.brasa, padding: 96, color: '#fff', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SLogoLockup dark height={40} />
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)' }}>FINAL · 05 / 05</span>
      </div>
      <div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color: '#fff' }}>PRÓXIMO PASSO</span>
        <div style={{ width: 96, height: 3, background: '#fff', margin: '32px 0 40px' }} />
        <h2 style={{ fontSize: 144, fontWeight: 700, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em' }}>
          Vamos operar<br/>juntos.
        </h2>
        <p style={{ fontSize: 32, marginTop: 48, lineHeight: 1.45, maxWidth: 1100, color: 'rgba(255,255,255,0.9)' }}>
          R$ 4.500/mês · setup em 7 dias · sem fidelidade.<br/>Resposta em até 24h após assinatura desta proposta.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 60, fontSize: 20, color: 'rgba(255,255,255,0.85)' }}>
        <div><div style={{ fontWeight: 700, color: '#fff' }}>WhatsApp</div><div style={{ marginTop: 4 }}>+55 94 9 8123-4567</div></div>
        <div><div style={{ fontWeight: 700, color: '#fff' }}>E-mail</div><div style={{ marginTop: 4 }}>klebson@hurtz.com.br</div></div>
        <div><div style={{ fontWeight: 700, color: '#fff' }}>Site</div><div style={{ marginTop: 4 }}>hurtz.com.br</div></div>
      </div>
    </section>
  );
}

window.TitleSlide = TitleSlide;
window.BigQuoteSlide = BigQuoteSlide;
window.StatsSlide = StatsSlide;
window.ComparisonSlide = ComparisonSlide;
window.CTASlide = CTASlide;
