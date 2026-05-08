/* @jsx React.createElement */
const C = window.HURTZ_COLORS;

function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 360, height: 720, background: '#0B141A', borderRadius: 32, padding: 12,
      fontFamily: 'Inter, -apple-system, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ width: '100%', height: '100%', background: '#EAE0D2', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

function WAHeader() {
  return (
    <div style={{
      background: '#1F2C33', color: '#E9EDEF', padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
    }}>
      <span style={{ fontSize: 20, color: '#8696A0' }}>‹</span>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: C.brasa,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <window.LogoSymbol size={14} color={'#fff'} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 600 }}>Hurtz · SDR</span>
        <span style={{ fontSize: 11, color: '#8696A0' }}>online</span>
      </div>
    </div>
  );
}

// CRM-style lead card delivered as a WhatsApp message
function CRMCard({ temp = 'quente' }) {
  const config = {
    quente: { color: C.resultado, label: 'LEAD QUENTE', text: 'Pronto para fechar' },
    morno:  { color: C.brasa, label: 'LEAD MORNO', text: '2ª tentativa de contato' },
    frio:   { color: C.informacao, label: 'LEAD FRIO', text: 'Novo · primeira abordagem' },
  }[temp];

  return (
    <div style={{
      background: '#fff', borderRadius: 6, padding: 0, width: 280,
      boxShadow: '0 1px 0.5px rgba(0,0,0,.13)', overflow: 'hidden',
      borderLeft: `3px solid ${config.color}`,
    }}>
      <div style={{ padding: '10px 12px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: config.color }}>{config.label}</span>
          <window.LogoSymbol size={10} color={C.pedra} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.carvao, marginTop: 6 }}>Gabriela Soares</div>
        <div style={{ fontSize: 11, color: C.grafite, marginTop: 2 }}>{config.text}</div>
      </div>
      <div style={{ padding: '10px 12px', borderTop: `1px solid ${C.areia}`, marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 10 }}>
        <div><div style={{ color: C.pedra, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 8.5 }}>Cota</div><div style={{ color: C.carvao, fontWeight: 700, marginTop: 2 }}>R$ 420.000</div></div>
        <div><div style={{ color: C.pedra, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 8.5 }}>Categoria</div><div style={{ color: C.carvao, fontWeight: 700, marginTop: 2 }}>Imóvel</div></div>
        <div><div style={{ color: C.pedra, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 8.5 }}>Origem</div><div style={{ color: C.carvao, fontWeight: 700, marginTop: 2 }}>Meta · Crv 04</div></div>
        <div><div style={{ color: C.pedra, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 8.5 }}>Cidade</div><div style={{ color: C.carvao, fontWeight: 700, marginTop: 2 }}>Belém · PA</div></div>
      </div>
      <div style={{ background: C.brasa, color: '#fff', padding: '9px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textAlign: 'center' }}>ABRIR FICHA COMPLETA →</div>
    </div>
  );
}

function MsgRow({ from = 'them', children, time }) {
  const mine = from === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
      <div style={{
        background: mine ? '#D9FDD3' : '#fff', maxWidth: 280, padding: '8px 10px',
        borderRadius: 6, fontSize: 13, color: '#111B21', lineHeight: 1.35,
        boxShadow: '0 1px 0.5px rgba(0,0,0,.13)',
      }}>
        {children}
        <div style={{ fontSize: 10, color: '#667781', textAlign: 'right', marginTop: 2 }}>{time}</div>
      </div>
    </div>
  );
}

function WAFlow() {
  return (
    <PhoneFrame>
      <WAHeader />
      <div style={{ flex: 1, padding: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ alignSelf: 'center', background: '#E0D9C7', padding: '3px 10px', borderRadius: 8, fontSize: 11, color: '#3D3A36', marginBottom: 4 }}>
          HOJE
        </div>
        <MsgRow time="08:42">
          Klebson, novo lead da campanha de abril.
        </MsgRow>
        <MsgRow time="08:42">
          <div style={{ marginTop: 2, marginBottom: 2 }}><CRMCard temp="quente" /></div>
        </MsgRow>
        <MsgRow time="08:43" from="me">
          Recebi. Ligando agora.
        </MsgRow>
        <MsgRow time="09:15">
          Contrato assinado. R$ 420k em cota imóvel ✓
        </MsgRow>
      </div>
      <div style={{ padding: 8, background: '#1F2C33', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, background: '#2A3942', borderRadius: 18, padding: '8px 14px', fontSize: 12, color: '#8696A0' }}>Mensagem</div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.brasa, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>›</div>
      </div>
    </PhoneFrame>
  );
}

window.CRMCard = CRMCard;
window.WAFlow = WAFlow;
