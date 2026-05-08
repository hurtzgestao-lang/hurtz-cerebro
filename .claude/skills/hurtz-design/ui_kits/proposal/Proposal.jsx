/* @jsx React.createElement */
const PC = window.HURTZ_COLORS;
const PLogoLockup = window.LogoLockup;
const PLogoSymbol = window.LogoSymbol;

function ProposalCover() {
  return (
    <div style={{
      width: 720, height: 920, background: PC.offwhite, padding: 48,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif', border: `1px solid ${PC.areia}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <PLogoLockup height={28} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: PC.pedra }}>PROPOSTA · 04 / 2026</span>
      </div>
      <div>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: PC.brasa, textTransform: 'uppercase' }}>Operação de aquisição</span>
        <div style={{ width: 56, height: 2, background: PC.brasa, margin: '14px 0 22px' }} />
        <h1 style={{ fontSize: 64, fontWeight: 700, lineHeight: 1, color: PC.carvao, margin: 0, letterSpacing: '-0.01em' }}>
          50 leads<br/>qualificados<br/>por dia.
        </h1>
        <p style={{ fontSize: 16, color: PC.grafite, lineHeight: 1.55, marginTop: 26, maxWidth: 460 }}>
          Cada um com ficha completa. Pronto para o seu Closer ligar e fechar contrato. Sem promessa vazia — método.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 11, color: PC.pedra }}>
        <div>
          <div style={{ fontWeight: 700, color: PC.carvao, letterSpacing: '0.04em' }}>Para: Klebson Almeida</div>
          <div style={{ marginTop: 2 }}>Representante · Parauapebas · PA</div>
        </div>
        <div style={{ textAlign: 'right', letterSpacing: '0.06em' }}>HURTZ · 01 / 04</div>
      </div>
    </div>
  );
}

function ProposalScope() {
  return (
    <div style={{
      width: 720, height: 920, background: PC.offwhite, padding: 48,
      fontFamily: 'Inter, sans-serif', border: `1px solid ${PC.areia}`,
      display: 'flex', flexDirection: 'column', gap: 28,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: PC.brasa, textTransform: 'uppercase' }}>02 · Escopo</span>
        <PLogoSymbol size={16} color={PC.carvao} />
      </div>
      <div>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: PC.carvao, lineHeight: 1.1, margin: 0 }}>O que está incluído.</h2>
        <p style={{ fontSize: 14, color: PC.grafite, marginTop: 10, lineHeight: 1.6, maxWidth: 540 }}>
          Operação completa, executada pela Hurtz. Você recebe os leads — nós cuidamos do resto.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: `1px solid ${PC.areia}`, background: '#fff' }}>
        {[
          ['01', 'Meta Ads', 'Criativos, copies e gestão de campanha. R$ 8k/mês de mídia inclusos.'],
          ['02', 'SDR dedicado', 'Qualifica cada lead em até 12 min. Filtra ruído.'],
          ['03', 'Closer treinado', 'Fecha contratos no script Hurtz. Comissão alinhada.'],
          ['04', 'CRM + WhatsApp', 'Lead chega no seu celular com ficha completa.'],
        ].map(([n, t, d]) => (
          <div key={n} style={{ padding: 24, borderRight: n === '01' || n === '03' ? `1px solid ${PC.areia}` : 0, borderBottom: n === '01' || n === '02' ? `1px solid ${PC.areia}` : 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PC.brasa }}>{n}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: PC.carvao, marginTop: 8 }}>{t}</div>
            <div style={{ fontSize: 13, color: PC.grafite, marginTop: 6, lineHeight: 1.5 }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: `1px solid ${PC.areia}`, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: PC.pedra, letterSpacing: '0.06em' }}>
        <span>HURTZ COMPANY · BRAND KIT 2026</span>
        <span>02 / 04</span>
      </div>
    </div>
  );
}

function ProposalNumbers() {
  return (
    <div style={{
      width: 720, height: 920, background: PC.carvao, padding: 48, color: PC.offwhite,
      fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 32,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: PC.brasa, textTransform: 'uppercase' }}>03 · Prova</span>
        <PLogoSymbol size={16} color={PC.offwhite} />
      </div>
      <div>
        <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.1, margin: 0 }}>Os números falam<br/>por nós.</h2>
        <p style={{ fontSize: 14, color: 'rgba(245,242,236,0.7)', marginTop: 10, lineHeight: 1.6, maxWidth: 500 }}>
          Operação de abril, agregada entre os clientes ativos da Hurtz. Sem extrapolação.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
        {[
          ['R$34M', 'em vendas/mês — clientes ativos'],
          ['1.482', 'leads qualificados em 30 dias'],
          ['R$14M', 'recorde Gabriela · cliente Hurtz'],
          ['22%', 'conversão SDR → Closer'],
        ].map(([num, lbl]) => (
          <div key={lbl}>
            <div style={{ width: 32, height: 2, background: PC.brasa, marginBottom: 14 }} />
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {num.replace(/(M|%)$/, '')}
              <span style={{ color: PC.brasa, fontSize: 36 }}>{(num.match(/(M|%)$/)||[''])[0]}</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(245,242,236,0.65)', marginTop: 12, lineHeight: 1.5 }}>{lbl}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: `1px solid rgba(245,242,236,0.15)`, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(245,242,236,0.5)', letterSpacing: '0.06em' }}>
        <span>HURTZ COMPANY · BRAND KIT 2026</span>
        <span>03 / 04</span>
      </div>
    </div>
  );
}

function ProposalPrice() {
  return (
    <div style={{
      width: 720, height: 920, background: PC.offwhite, padding: 48,
      fontFamily: 'Inter, sans-serif', border: `1px solid ${PC.areia}`,
      display: 'flex', flexDirection: 'column', gap: 28,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: PC.brasa, textTransform: 'uppercase' }}>04 · Investimento</span>
        <PLogoSymbol size={16} color={PC.carvao} />
      </div>
      <div>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: PC.carvao, lineHeight: 1.1, margin: 0 }}>Investimento.</h2>
        <p style={{ fontSize: 14, color: PC.grafite, marginTop: 10, lineHeight: 1.6, maxWidth: 540 }}>
          Sem taxa escondida. Sem fidelidade abusiva. Mês a mês — porque o resultado segura o cliente, não o contrato.
        </p>
      </div>
      <div style={{ background: '#fff', border: `1px solid ${PC.areia}`, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PC.brasa }}>OPERAÇÃO MENSAL</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: PC.carvao, marginTop: 6 }}>Hurtz · Plano Único</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: PC.carvao, lineHeight: 1, letterSpacing: '-0.01em' }}>
              R$ 4.500<span style={{ fontSize: 18, color: PC.brasa }}>/mês</span>
            </div>
            <div style={{ fontSize: 11, color: PC.pedra, marginTop: 6 }}>+ R$ 8.000/mês de mídia (Meta)</div>
          </div>
        </div>
        <div style={{ height: 1, background: PC.areia }} />
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
          {['Setup completo em 7 dias', 'SDR + Closer dedicados', 'Criativos ilimitados', 'CRM + WhatsApp integrado', 'Relatório semanal', 'Sem fidelidade'].map(i => (
            <li key={i} style={{ fontSize: 13, color: PC.grafite, paddingLeft: 14, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: 7, width: 6, height: 2, background: PC.brasa }} />{i}
            </li>
          ))}
        </ul>
      </div>
      <button style={{
        background: PC.brasa, color: '#fff', border: 'none', padding: '18px 28px',
        fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', borderRadius: 4,
        alignSelf: 'flex-start', fontFamily: 'inherit', cursor: 'pointer',
      }}>ASSINAR PROPOSTA →</button>
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: `1px solid ${PC.areia}`, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: PC.pedra, letterSpacing: '0.06em' }}>
        <span>HURTZ COMPANY · BRAND KIT 2026</span>
        <span>04 / 04</span>
      </div>
    </div>
  );
}

window.ProposalCover = ProposalCover;
window.ProposalScope = ProposalScope;
window.ProposalNumbers = ProposalNumbers;
window.ProposalPrice = ProposalPrice;
