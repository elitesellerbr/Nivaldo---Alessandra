import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Menu, X, Globe, ChevronDown, CheckCircle, MessageCircle, Star, Hammer, Droplets, Zap, Home, ArrowRight } from 'lucide-react'

type Lang = 'it' | 'pt'

const SERVICES_IT = [
  { icon: Hammer, title: 'Demolizioni e Rimozioni', desc: 'Rimozione sanitari, pavimenti e rivestimenti con smaltimento certificato alle piattaforme di raccolta.' },
  { icon: Droplets, title: 'Impianto Idraulico', desc: 'Formazione di nuovo impianto idraulico per WC, bidet, lavandino, doccia e rubinetti di arresto.' },
  { icon: Zap, title: 'Impianto Elettrico', desc: 'Modifiche e nuovi impianti elettrici a norma, con tutti i materiali necessari per opera finita.' },
  { icon: Home, title: 'Pavimenti e Rivestimenti', desc: 'Fornitura e posa di pavimento e rivestimento in gres formato 60x120, sottofondo e rasatura inclusi.' },
  { icon: CheckCircle, title: 'Sanitari e Accessori', desc: 'Fornitura e montaggio di WC a filo muro, bidet, box doccia, scaldasalviette e porte scorrevoli.' },
  { icon: Star, title: 'Tinteggiatura', desc: 'Imbiancatura con pittura lavabile e traspirante di alta qualità, per una finitura perfetta.' },
]

const SERVICES_PT = [
  { icon: Hammer, title: 'Demolições e Remoções', desc: 'Remoção de sanitários, pisos e revestimentos com descarte certificado nas plataformas de coleta.' },
  { icon: Droplets, title: 'Instalação Hidráulica', desc: 'Formação de nova instalação hidráulica para WC, bidê, pia, chuveiro e registros de corte.' },
  { icon: Zap, title: 'Instalação Elétrica', desc: 'Modificações e novas instalações elétricas conforme norma, com todos os materiais necessários.' },
  { icon: Home, title: 'Pisos e Revestimentos', desc: 'Fornecimento e assentamento de piso e revestimento em grês formato 60x120, contrapiso incluído.' },
  { icon: CheckCircle, title: 'Sanitários e Acessórios', desc: 'Fornecimento e montagem de WC embutido, bidê, box de chuveiro, aquecedor de toalha e portas.' },
  { icon: Star, title: 'Pintura', desc: 'Pintura lavável e transpirante de alta qualidade para um acabamento perfeito.' },
]

const t = {
  it: {
    nav: { services: 'Servizi', howItWorks: 'Come funziona', contact: 'Contatti', quote: 'Richiedi preventivo' },
    hero: {
      badge: 'Ristrutturazione bagni · Milano e Hinterland',
      title1: 'Rifacciamo il tuo',
      title2: 'bagno da zero.',
      sub: 'Demolizione, impianti, piastrelle, sanitari e tinteggiatura. Tutto incluso, prezzo fisso, zero sorprese.',
      cta: 'Richiedi preventivo gratuito',
      cta2: 'Chiama ora',
      stats: [
        { n: '15+', l: 'Anni di esperienza' },
        { n: '200+', l: 'Bagni ristrutturati' },
        { n: '100%', l: 'Soddisfazione garantita' },
      ],
    },
    services: { label: 'Cosa facciamo', title: 'Servizi completi\nchiavi in mano', sub: 'Gestiamo ogni fase della ristrutturazione del tuo bagno, dalla demolizione alla pulizia finale.' },
    howItWorks: {
      label: 'Come funziona',
      title: 'Tre passi verso\nil tuo nuovo bagno',
      steps: [
        { n: '01', t: 'Sopralluogo gratuito', d: 'Veniamo a casa tua, misuriamo gli spazi e capiamo le tue esigenze. Senza impegno.' },
        { n: '02', t: 'Preventivo dettagliato', d: 'Ricevi un preventivo chiaro e trasparente entro 24 ore. Prezzo fisso, niente sorprese.' },
        { n: '03', t: 'Lavoriamo noi', d: 'La nostra squadra esegue tutto il lavoro con materiali di qualità, rispettando i tempi concordati.' },
      ],
    },
    price: {
      label: 'Esempio di preventivo reale',
      title: 'Ristrutturazione bagno completa\na partire da €12.600',
      includes: 'Cosa è incluso:',
      items: ['Rimozione sanitari, pavimento e rivestimenti', 'Nuovo impianto idraulico completo', 'Modifiche impianto elettrico', 'Nuovo pavimento e rivestimento 60x120', 'Fornitura e montaggio sanitari', 'Box doccia, porta scorrevole, finestra', 'Scaldasalviette e tinteggiatura'],
      note: 'Prezzo a corpo · Pagamento 50% all\'inizio, 50% a fine lavori',
      cta: 'Richiedi il tuo preventivo',
    },
    quote: {
      label: 'Preventivo gratuito',
      title: 'Diteci di cosa\navete bisogno',
      sub: 'Compilate il form, vi contattiamo entro 24 ore per fissare il sopralluogo gratuito.',
      name: 'Nome e cognome *', phone: 'Telefono *', email: 'Email', address: 'Indirizzo dell\'immobile *',
      service: 'Tipo di lavoro *', desc: 'Descrizione del lavoro *', budget: 'Budget indicativo',
      services: ['Ristrutturazione bagno completa', 'Solo impianto idraulico', 'Pavimenti e rivestimenti', 'Impianto elettrico', 'Tinteggiatura', 'Altro'],
      send: 'Invia richiesta', sending: 'Invio in corso...', success: 'Richiesta inviata! Vi contatteremo presto.', error: 'Errore. Riprova.',
    },
    footer: { rights: '© 2026 Moura Da Silva Nivaldo. Tutti i diritti riservati.', vat: 'P.IVA: IT05142890960 · CF: MRDNLD77A01Z602C' },
  },
  pt: {
    nav: { services: 'Serviços', howItWorks: 'Como funciona', contact: 'Contato', quote: 'Pedir orçamento' },
    hero: {
      badge: 'Reforma de banheiros · Milão e região',
      title1: 'Reformamos seu',
      title2: 'banheiro do zero.',
      sub: 'Demolição, instalações, revestimentos, sanitários e pintura. Tudo incluído, preço fixo, zero surpresas.',
      cta: 'Pedir orçamento grátis',
      cta2: 'Ligar agora',
      stats: [
        { n: '15+', l: 'Anos de experiência' },
        { n: '200+', l: 'Banheiros reformados' },
        { n: '100%', l: 'Satisfação garantida' },
      ],
    },
    services: { label: 'O que fazemos', title: 'Serviços completos\nchave na mão', sub: 'Gerenciamos cada fase da reforma do seu banheiro, da demolição à limpeza final.' },
    howItWorks: {
      label: 'Como funciona',
      title: 'Três passos para\no seu novo banheiro',
      steps: [
        { n: '01', t: 'Visita gratuita', d: 'Vamos até sua casa, medimos os espaços e entendemos suas necessidades. Sem compromisso.' },
        { n: '02', t: 'Orçamento detalhado', d: 'Você recebe um orçamento claro e transparente em até 24 horas. Preço fixo, sem surpresas.' },
        { n: '03', t: 'Nós trabalhamos', d: 'Nossa equipe executa todo o trabalho com materiais de qualidade, respeitando os prazos.' },
      ],
    },
    price: {
      label: 'Exemplo de orçamento real',
      title: 'Reforma completa de banheiro\na partir de €12.600',
      includes: 'O que está incluído:',
      items: ['Remoção de sanitários, piso e revestimentos', 'Nova instalação hidráulica completa', 'Modificações na instalação elétrica', 'Novo piso e revestimento 60x120', 'Fornecimento e montagem de sanitários', 'Box de chuveiro, porta deslizante, janela', 'Aquecedor de toalha e pintura'],
      note: 'Preço fixo · Pagamento 50% no início, 50% ao final',
      cta: 'Pedir meu orçamento',
    },
    quote: {
      label: 'Orçamento gratuito',
      title: 'Nos diga do que\nvocê precisa',
      sub: 'Preencha o formulário, entramos em contato em até 24 horas para marcar a visita gratuita.',
      name: 'Nome completo *', phone: 'Telefone *', email: 'E-mail', address: 'Endereço do imóvel *',
      service: 'Tipo de trabalho *', desc: 'Descrição do trabalho *', budget: 'Orçamento indicativo',
      services: ['Reforma completa de banheiro', 'Só instalação hidráulica', 'Pisos e revestimentos', 'Instalação elétrica', 'Pintura', 'Outro'],
      send: 'Enviar pedido', sending: 'Enviando...', success: 'Pedido enviado! Entraremos em contato em breve.', error: 'Erro. Tente novamente.',
    },
    footer: { rights: '© 2026 Moura Da Silva Nivaldo. Todos os direitos reservados.', vat: 'P.IVA: IT05142890960 · CF: MRDNLD77A01Z602C' },
  },
}

function MouraLogo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const c = light ? '#F7F3EE' : '#1A1714'
  const g = '#C9A96E'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke={g} strokeWidth="1.5" strokeDasharray="4 3"/>
      <path d="M22 68 L22 35 L50 55 L78 35 L78 68" stroke={c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="55" x2="50" y2="68" stroke={g} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="28" r="3" fill={g}/>
    </svg>
  )
}

interface Settings { phone: string; email: string; whatsapp: string; address: string }

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('it')
  const [menuOpen, setMenuOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>({ phone: '328 064 2160', email: '', whatsapp: '3280642160', address: 'Via Piacenza, 2 - Limbiate (MB)' })
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', serviceType: '', description: '', budget: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const tx = t[lang]
  const services = lang === 'it' ? SERVICES_IT : SERVICES_PT

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(s => {
      if (s) setSettings({ phone: s.phone || '328 064 2160', email: s.email || '', whatsapp: s.whatsapp || '3280642160', address: s.address || 'Via Piacenza, 2 - Limbiate (MB)' })
    }).catch(() => {})
  }, [])

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) { setForm({ name: '', phone: '', email: '', address: '', serviceType: '', description: '', budget: '' }); setTimeout(() => setStatus('idle'), 5000) }
      else setTimeout(() => setStatus('idle'), 3000)
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 3000) }
  }

  const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'it' ? 'Buongiorno, vorrei richiedere un preventivo per la ristrutturazione del bagno.' : 'Bom dia, gostaria de solicitar um orçamento para reforma de banheiro.')}`

  const inp: React.CSSProperties = { width: '100%', padding: '.75rem 1rem', border: '1px solid #D4CEC8', backgroundColor: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: '.875rem', color: '#1A1714', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '.68rem', letterSpacing: '.13em', textTransform: 'uppercase', color: '#9E9089', marginBottom: '.4rem', fontFamily: 'DM Sans, sans-serif' }

  return (
    <div style={{ backgroundColor: '#F7F3EE', color: '#1A1714', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: '#F7F3EE', borderBottom: '1px solid #D4CEC8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <MouraLogo size={34} />
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 600, letterSpacing: '.15em' }}>MOURA</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="nav-desktop">
            {(['services', 'howItWorks', 'contact'] as const).map(k => (
              <button key={k} onClick={() => scrollTo(k)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9E9089' }}>
                {tx.nav[k]}
              </button>
            ))}
            <button onClick={() => scrollTo('quote')} style={{ backgroundColor: '#C9A96E', color: '#1A1714', padding: '.55rem 1.25rem', border: 'none', cursor: 'pointer', fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 500 }}>
              {tx.nav.quote}
            </button>
            <div style={{ display: 'flex', gap: '2px', paddingLeft: '.875rem', borderLeft: '1px solid #D4CEC8' }}>
              {(['it', 'pt'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.68rem', fontWeight: lang === l ? 500 : 400, color: lang === l ? '#1A1714' : '#9E9089', padding: '2px 5px', textTransform: 'uppercase' }}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <button className="nav-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div style={{ backgroundColor: '#F7F3EE', borderTop: '1px solid #D4CEC8', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {(['services', 'howItWorks', 'contact'] as const).map(k => (
              <button key={k} onClick={() => scrollTo(k)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '.875rem', textTransform: 'uppercase', letterSpacing: '.08em', color: '#1A1714' }}>{tx.nav[k]}</button>
            ))}
            <button onClick={() => scrollTo('quote')} style={{ backgroundColor: '#C9A96E', color: '#1A1714', padding: '.65rem 1rem', border: 'none', cursor: 'pointer', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 500 }}>{tx.nav.quote}</button>
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '.5rem', borderTop: '1px solid #D4CEC8' }}>
              {(['it', 'pt'] as Lang[]).map(l => (
                <button key={l} onClick={() => { setLang(l); setMenuOpen(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.75rem', fontWeight: lang === l ? 600 : 400, color: lang === l ? '#1A1714' : '#9E9089', textTransform: 'uppercase' }}>
                  {l === 'it' ? '🇮🇹 Italiano' : '🇧🇷 Português'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .035, backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1714 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', top: '10%', right: '-8%', width: '60%', height: '80%', border: '1px solid #C9A96E', transform: 'rotate(5deg)', opacity: .1, borderRadius: '2px' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#E8D5B0', padding: '.4rem 1rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#A07840', fontWeight: 500 }}>{tx.hero.badge}</span>
            </div>

            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.05, marginBottom: '.1em' }}>
              {tx.hero.title1}
            </h1>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.05, marginBottom: '1.75rem' }}>
              {tx.hero.title2}
            </h1>
            <div style={{ width: '70px', height: '2px', backgroundColor: '#C9A96E', marginBottom: '1.75rem' }} />
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#3D3530', maxWidth: '480px', marginBottom: '2.5rem' }}>
              {tx.hero.sub}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <button onClick={() => scrollTo('quote')} style={{ backgroundColor: '#1A1714', color: '#F7F3EE', padding: '.875rem 2rem', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
                {tx.hero.cta}
              </button>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', color: '#1A1714', padding: '.875rem 1.5rem', border: '1px solid #1A1714', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
                <Phone size={14} /> {tx.hero.cta2}
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {tx.hero.stats.map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: '#1A1714', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9E9089', marginTop: '3px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#9E9089' }}>scroll</span>
          <ChevronDown size={15} style={{ color: '#C9A96E', animation: 'bounce 2s infinite' }} />
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}} @media(max-width:768px){.nav-desktop{display:none!important}.nav-mobile{display:block!important}}`}</style>
      </section>

      {/* SERVIZI */}
      <section id="services" style={{ backgroundColor: '#1A1714', padding: '6rem 1.5rem', color: '#F7F3EE' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E' }} />
            <span style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A96E' }}>{tx.services.label}</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem', whiteSpace: 'pre-line' }}>{tx.services.title}</h2>
          <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'rgba(247,243,238,.6)', maxWidth: '520px', marginBottom: '3.5rem' }}>{tx.services.sub}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1px' }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: '2rem', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,.04)' : 'transparent', borderTop: '1px solid rgba(201,169,110,.2)' }}>
                <s.icon size={22} style={{ color: '#C9A96E', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, marginBottom: '.75rem', color: '#F7F3EE' }}>{s.title}</h3>
                <p style={{ fontSize: '.85rem', lineHeight: 1.75, color: 'rgba(247,243,238,.6)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="howItWorks" style={{ backgroundColor: '#FDFAF7', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E' }} />
            <span style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A96E' }}>{tx.howItWorks.label}</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '3.5rem', whiteSpace: 'pre-line' }}>{tx.howItWorks.title}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '2px' }}>
            {tx.howItWorks.steps.map((s, i) => (
              <div key={i} style={{ backgroundColor: '#F7F3EE', padding: '2.5rem 2rem', position: 'relative' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', fontWeight: 600, color: '#E8D5B0', lineHeight: 1, marginBottom: '1rem', userSelect: 'none' }}>{s.n}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400, marginBottom: '.875rem', color: '#1A1714' }}>{s.t}</h3>
                <p style={{ fontSize: '.875rem', lineHeight: 1.75, color: '#3D3530' }}>{s.d}</p>
                {i < tx.howItWorks.steps.length - 1 && (
                  <ArrowRight size={18} style={{ position: 'absolute', top: '50%', right: '-10px', transform: 'translateY(-50%)', color: '#C9A96E', zIndex: 1 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇO / PREVENTIVO ESEMPIO */}
      <section style={{ backgroundColor: '#1A1714', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="price-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E' }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A96E' }}>{tx.price.label}</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.15, color: '#F7F3EE', marginBottom: '2rem' }}>{tx.price.title}</h2>
            <button onClick={() => scrollTo('quote')} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#C9A96E', color: '#1A1714', padding: '.875rem 1.75rem', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>
              {tx.price.cta} <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ backgroundColor: 'rgba(247,243,238,.05)', border: '1px solid rgba(201,169,110,.25)', padding: '2.5rem' }}>
            <p style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '1.25rem' }}>{tx.price.includes}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
              {tx.price.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={15} style={{ color: '#C9A96E', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '.875rem', lineHeight: 1.5, color: 'rgba(247,243,238,.8)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,169,110,.25)', fontSize: '.75rem', color: 'rgba(247,243,238,.45)', lineHeight: 1.6 }}>{tx.price.note}</div>
          </div>
        </div>
        <style>{`.price-grid{grid-template-columns:1fr 1fr}@media(max-width:768px){.price-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* FORM PREVENTIVO */}
      <section id="quote" style={{ backgroundColor: '#F7F3EE', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }} className="quote-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E' }} />
              <span style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#C9A96E' }}>{tx.quote.label}</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.1, marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>{tx.quote.title}</h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: '#3D3530', marginBottom: '2.5rem' }}>{tx.quote.sub}</p>

            <div id="contact" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Phone, text: settings.phone, href: `tel:${settings.phone.replace(/\s/g,'')}` },
                settings.email ? { icon: Mail, text: settings.email, href: `mailto:${settings.email}` } : null,
                { icon: MapPin, text: settings.address, href: '' },
              ].filter(Boolean).map((item: any, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '34px', height: '34px', border: '1px solid #D4CEC8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={14} style={{ color: '#C9A96E' }} />
                  </div>
                  {item.href ? <a href={item.href} style={{ fontSize: '.875rem', color: '#3D3530', textDecoration: 'none', lineHeight: 1.5, paddingTop: '8px' }}>{item.text}</a>
                    : <span style={{ fontSize: '.875rem', color: '#3D3530', lineHeight: 1.5, paddingTop: '8px' }}>{item.text}</span>}
                </div>
              ))}
              {/* WhatsApp */}
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '.5rem', backgroundColor: '#25D366', color: '#fff', padding: '.7rem 1.25rem', textDecoration: 'none', fontSize: '.78rem', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500 }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleQuote} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={lbl}>{tx.quote.name}</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = '#D4CEC8')} />
              </div>
              <div>
                <label style={lbl}>{tx.quote.phone}</label>
                <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = '#D4CEC8')} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={lbl}>{tx.quote.email}</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inp}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = '#D4CEC8')} />
              </div>
              <div>
                <label style={lbl}>{tx.quote.budget}</label>
                <input value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="es. €5.000 - €15.000" style={inp}
                  onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = '#D4CEC8')} />
              </div>
            </div>
            <div>
              <label style={lbl}>{tx.quote.address}</label>
              <input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} style={inp}
                onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = '#D4CEC8')} />
            </div>
            <div>
              <label style={lbl}>{tx.quote.service}</label>
              <select required value={form.serviceType} onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
                <option value=""></option>
                {tx.quote.services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>{tx.quote.desc}</label>
              <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...inp, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = '#D4CEC8')} />
            </div>
            <button type="submit" disabled={status === 'sending'} style={{
              backgroundColor: status === 'success' ? '#6B7B5E' : status === 'error' ? '#8B3A2A' : '#1A1714',
              color: '#F7F3EE', padding: '1rem', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
              fontSize: '.8rem', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', transition: 'background-color .3s',
            }}>
              {status === 'sending' ? tx.quote.sending : status === 'success' ? tx.quote.success : status === 'error' ? tx.quote.error : tx.quote.send}
            </button>
          </form>
        </div>
        <style>{`.quote-grid{grid-template-columns:1fr 1.4fr}@media(max-width:768px){.quote-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1A1714', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MouraLogo size={30} light />
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '.15em', color: '#F7F3EE' }}>MOURA</div>
                <div style={{ fontSize: '.6rem', color: 'rgba(247,243,238,.4)', letterSpacing: '.08em' }}>Ristrutturazioni · Limbiate (MB)</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <a href={`tel:${settings.phone.replace(/\s/g,'')}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(247,243,238,.55)', textDecoration: 'none', fontSize: '.8rem' }}>
                <Phone size={13} style={{ color: '#C9A96E' }} /> {settings.phone}
              </a>
              {settings.email && (
                <a href={`mailto:${settings.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(247,243,238,.55)', textDecoration: 'none', fontSize: '.8rem' }}>
                  <Mail size={13} style={{ color: '#C9A96E' }} /> {settings.email}
                </a>
              )}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(247,243,238,.1)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem' }}>
            <p style={{ fontSize: '.65rem', color: 'rgba(247,243,238,.3)', letterSpacing: '.05em' }}>{tx.footer.rights}</p>
            <p style={{ fontSize: '.65rem', color: 'rgba(247,243,238,.3)', letterSpacing: '.05em' }}>{tx.footer.vat}</p>
            <a href="/admin" style={{ fontSize: '.6rem', color: 'rgba(247,243,238,.15)', textDecoration: 'none', letterSpacing: '.1em', textTransform: 'uppercase' }}>Admin</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
