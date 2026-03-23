import { useState, useEffect, useRef } from 'react'
import { Instagram, Facebook, Mail, Phone, MapPin, ChevronDown, Menu, X, Globe } from 'lucide-react'

type Lang = 'it' | 'pt'

const t = {
  it: {
    nav: { stories: 'Storie', about: 'Chi siamo', contact: 'Contatti' },
    hero: {
      tagline: 'Dove ogni storia',
      tagline2: 'trova casa',
      sub: 'Un luogo di incontro tra culture, memorie e persone. La nostra missione è preservare e celebrare le storie che ci definiscono.',
      cta: 'Scopri le storie',
      cta2: 'Contattaci',
    },
    about: {
      label: 'Chi siamo',
      title: 'Costruiamo ponti\ntra i mondi',
      p1: 'Moura nasce dall\'incontro tra due culture, due lingue, due cuori. È uno spazio dove le storie trovano voce, dove le radici si intrecciano con i sogni del futuro.',
      p2: 'Attraverso le nostre attività, coltiviamo connessioni autentiche tra la comunità italiana e quella brasiliana, creando un patrimonio condiviso di esperienze e memorie.',
      stat1: 'Storie raccolte',
      stat2: 'Anni di storia',
      stat3: 'Comunità unite',
    },
    stories: {
      label: 'Le nostre storie',
      title: 'Memorie che\nresistono al tempo',
      empty: 'Le storie saranno disponibili presto.',
      readMore: 'Leggi di più',
    },
    contact: {
      label: 'Contatti',
      title: 'Parliamo\ninsieme',
      sub: 'Hai una storia da raccontare? Vuoi far parte della nostra comunità? Siamo qui per ascoltarti.',
      name: 'Nome completo',
      email: 'Email',
      phone: 'Telefono (opzionale)',
      message: 'Il tuo messaggio',
      send: 'Invia messaggio',
      sending: 'Invio in corso...',
      success: 'Messaggio inviato con successo!',
      error: 'Errore nell\'invio. Riprova.',
    },
    footer: {
      copy: '© 2025 Moura. Tutti i diritti riservati.',
      made: 'Con amore, tra due culture.',
    },
  },
  pt: {
    nav: { stories: 'Histórias', about: 'Quem somos', contact: 'Contato' },
    hero: {
      tagline: 'Onde cada história',
      tagline2: 'encontra seu lar',
      sub: 'Um lugar de encontro entre culturas, memórias e pessoas. Nossa missão é preservar e celebrar as histórias que nos definem.',
      cta: 'Conheça as histórias',
      cta2: 'Fale conosco',
    },
    about: {
      label: 'Quem somos',
      title: 'Construímos pontes\nentre mundos',
      p1: 'Moura nasce do encontro entre duas culturas, dois idiomas, dois corações. É um espaço onde as histórias encontram voz, onde as raízes se entrelaçam com os sonhos do futuro.',
      p2: 'Por meio de nossas atividades, cultivamos conexões autênticas entre a comunidade italiana e a brasileira, criando um patrimônio compartilhado de experiências e memórias.',
      stat1: 'Histórias coletadas',
      stat2: 'Anos de história',
      stat3: 'Comunidades unidas',
    },
    stories: {
      label: 'Nossas histórias',
      title: 'Memórias que\nresistem ao tempo',
      empty: 'As histórias estarão disponíveis em breve.',
      readMore: 'Ler mais',
    },
    contact: {
      label: 'Contato',
      title: 'Vamos conversar\njuntos',
      sub: 'Tem uma história para contar? Quer fazer parte da nossa comunidade? Estamos aqui para ouvir você.',
      name: 'Nome completo',
      email: 'E-mail',
      phone: 'Telefone (opcional)',
      message: 'Sua mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso!',
      error: 'Erro ao enviar. Tente novamente.',
    },
    footer: {
      copy: '© 2025 Moura. Todos os direitos reservados.',
      made: 'Com amor, entre duas culturas.',
    },
  },
}

interface Story {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

interface Settings {
  companyName: string
  phone: string
  email: string
  address: string
  instagram: string
  facebook: string
}

function MouraLogo({ size = 48, light = false }: { size?: number; light?: boolean }) {
  const color = light ? '#F7F3EE' : '#1A1714'
  const gold = '#C9A96E'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Círculo ornamental externo */}
      <circle cx="50" cy="50" r="46" stroke={gold} strokeWidth="1.5" strokeDasharray="4 3" />
      {/* M estilizado */}
      <path d="M22 68 L22 35 L50 55 L78 35 L78 68" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Linha dourada central */}
      <line x1="50" y1="55" x2="50" y2="68" stroke={gold} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Pontos decorativos */}
      <circle cx="50" cy="28" r="3" fill={gold}/>
      <circle cx="22" cy="28" r="2" fill={color} opacity="0.4"/>
      <circle cx="78" cy="28" r="2" fill={color} opacity="0.4"/>
    </svg>
  )
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('it')
  const [menuOpen, setMenuOpen] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [expandedStory, setExpandedStory] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const heroRef = useRef<HTMLDivElement>(null)
  const tx = t[lang]

  useEffect(() => {
    fetch('/api/stories').then(r => r.json()).then(setStories).catch(() => {})
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {})
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      if (res.ok) {
        setFormStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 4000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 3000)
      }
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)' }}>

      {/* ── NAV ── */}
      <nav style={{ backgroundColor: 'var(--cream)' }} className="fixed top-0 left-0 right-0 z-50 border-b" 
           style2="border-color: var(--stone-light)">
        <div style={{ borderBottom: '1px solid var(--stone-light)' }}>
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
              <MouraLogo size={36} />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--ink)' }}>
                MOURA
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {(['stories', 'about', 'contact'] as const).map(k => (
                <button key={k} onClick={() => scrollTo(k)}
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.1em', color: 'var(--stone)', textTransform: 'uppercase' }}
                  className="hover:text-ink transition-colors duration-200"
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--stone)')}>
                  {tx.nav[k]}
                </button>
              ))}

              {/* Lang toggle */}
              <div className="flex items-center gap-1 ml-2" style={{ borderLeft: '1px solid var(--stone-light)', paddingLeft: '1rem' }}>
                <Globe size={13} style={{ color: 'var(--stone)' }} />
                {(['it', 'pt'] as Lang[]).map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    style={{
                      fontSize: '0.75rem', fontWeight: lang === l ? 500 : 400, letterSpacing: '0.05em',
                      color: lang === l ? 'var(--ink)' : 'var(--stone)',
                      padding: '2px 6px', textTransform: 'uppercase',
                    }}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--ink)' }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: 'var(--cream)', borderBottom: '1px solid var(--stone-light)' }} className="md:hidden px-6 py-4 flex flex-col gap-4">
            {(['stories', 'about', 'contact'] as const).map(k => (
              <button key={k} onClick={() => scrollTo(k)}
                style={{ fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', textAlign: 'left' }}>
                {tx.nav[k]}
              </button>
            ))}
            <div className="flex gap-3 pt-2" style={{ borderTop: '1px solid var(--stone-light)' }}>
              {(['it', 'pt'] as Lang[]).map(l => (
                <button key={l} onClick={() => { setLang(l); setMenuOpen(false) }}
                  style={{ fontSize: '0.75rem', fontWeight: lang === l ? 600 : 400, color: lang === l ? 'var(--ink)' : 'var(--stone)', textTransform: 'uppercase' }}>
                  {l === 'it' ? '🇮🇹 Italiano' : '🇧🇷 Português'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '4rem' }}>
        {/* Fundo textura */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
        {/* Linha diagonal decorativa */}
        <div style={{
          position: 'absolute', top: '15%', right: '-5%', width: '55%', height: '70%',
          border: '1px solid var(--gold)', borderRadius: '2px', transform: 'rotate(6deg)', opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '0%', width: '45%', height: '60%',
          border: '1px solid var(--gold)', borderRadius: '2px', transform: 'rotate(6deg)', opacity: 0.08,
        }} />

        <div className="max-w-6xl mx-auto px-6 w-full">
          <div style={{ maxWidth: '680px' }}>
            {/* Label */}
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', opacity: 0 }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }} />
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>
                {lang === 'it' ? 'Storie e Memoria' : 'Histórias e Memória'}
              </span>
            </div>

            {/* Heading principal */}
            <h1 className="animate-fade-up" style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: '1.05', color: 'var(--ink)',
              marginBottom: '0.1em', opacity: 0, animationDelay: '0.15s'
            }}>
              {tx.hero.tagline}
            </h1>
            <h1 className="animate-fade-up delay-200" style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 600,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: '1.05', color: 'var(--ink)',
              marginBottom: '2rem', opacity: 0
            }}>
              {tx.hero.tagline2}
            </h1>

            {/* Linha dourada */}
            <div className="animate-slide-right delay-300" style={{ width: '80px', height: '2px', backgroundColor: 'var(--gold)', marginBottom: '2rem', opacity: 0, transformOrigin: 'left' }} />

            <p className="animate-fade-up delay-400" style={{
              fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '1.05rem',
              lineHeight: '1.75', color: 'var(--ink-light)', maxWidth: '500px', marginBottom: '3rem', opacity: 0
            }}>
              {tx.hero.sub}
            </p>

            <div className="animate-fade-up delay-500" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0 }}>
              <button onClick={() => scrollTo('stories')} style={{
                backgroundColor: 'var(--ink)', color: 'var(--cream)',
                padding: '0.85rem 2rem', fontSize: '0.8rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--cream)' }}>
                {tx.hero.cta}
              </button>
              <button onClick={() => scrollTo('contact')} style={{
                backgroundColor: 'transparent', color: 'var(--ink)',
                padding: '0.85rem 2rem', fontSize: '0.8rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                border: '1px solid var(--ink)', cursor: 'pointer', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)' }}>
                {tx.hero.cta2}
              </button>
            </div>
          </div>

          {/* Logo grande decorativa */}
          <div className="animate-fade-in delay-600" style={{
            position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
            opacity: 0, display: 'none',
          }} id="hero-logo-lg">
            <MouraLogo size={260} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--stone)', fontFamily: 'DM Sans, sans-serif' }}>scroll</span>
          <ChevronDown size={16} style={{ color: 'var(--gold)', animation: 'bounce 2s infinite' }} />
        </div>

        <style>{`
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
          @media(min-width:900px){ #hero-logo-lg{display:block!important} }
        `}</style>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '8rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}
               className="about-grid">
            {/* Lado esquerdo - decorativo */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '100%', aspectRatio: '4/5', border: '1px solid rgba(201,169,110,0.3)',
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MouraLogo size={160} light />
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '60px', height: '60px', border: '1px solid var(--gold)', opacity: 0.4 }} />
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '60px', height: '60px', border: '1px solid var(--gold)', opacity: 0.4 }} />
                {/* Stats */}
                {[
                  { num: '200+', label: tx.about.stat1 },
                  { num: '10+', label: tx.about.stat2 },
                  { num: '2', label: tx.about.stat3 },
                ].map((s, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    ...(i === 0 ? { top: '10%', right: '-2rem' } : i === 1 ? { bottom: '25%', left: '-2rem' } : { bottom: '10%', right: '-2rem' }),
                    backgroundColor: 'var(--gold)', padding: '1rem 1.25rem', textAlign: 'center', minWidth: '100px',
                  }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', marginTop: '4px', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lado direito - texto */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--gold)' }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>
                  {tx.about.label}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', lineHeight: '1.1', color: 'var(--cream)',
                marginBottom: '2rem', whiteSpace: 'pre-line',
              }}>
                {tx.about.title}
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '0.95rem', lineHeight: '1.8', color: 'rgba(247,243,238,0.7)', marginBottom: '1.5rem' }}>
                {tx.about.p1}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '0.95rem', lineHeight: '1.8', color: 'rgba(247,243,238,0.7)' }}>
                {tx.about.p2}
              </p>
            </div>
          </div>
        </div>
        <style>{`
          .about-grid { grid-template-columns: 1fr 1fr; }
          @media(max-width:768px){ .about-grid { grid-template-columns: 1fr; gap: 3rem; } }
        `}</style>
      </section>

      {/* ── STORIES ── */}
      <section id="stories" style={{ padding: '8rem 0', backgroundColor: 'var(--warm-white)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--gold)' }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>
                  {tx.stories.label}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', lineHeight: '1.1', color: 'var(--ink)',
                whiteSpace: 'pre-line',
              }}>
                {tx.stories.title}
              </h2>
            </div>
            <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--stone-light)', alignSelf: 'center' }} />
          </div>

          {/* Grid stories */}
          {stories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <MouraLogo size={60} />
              <p style={{ marginTop: '1.5rem', color: 'var(--stone)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                {tx.stories.empty}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px' }}>
              {stories.map((story, i) => (
                <div key={story.id} style={{
                  backgroundColor: i % 3 === 0 ? 'var(--ink)' : i % 3 === 1 ? 'var(--cream)' : 'var(--gold-light)',
                  padding: '3rem 2.5rem', cursor: 'pointer', transition: 'transform 0.3s ease',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}>
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.15 }}>
                    <MouraLogo size={40} light={i % 3 === 0} />
                  </div>
                  <div style={{
                    fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem',
                    color: i % 3 === 0 ? 'var(--gold)' : 'var(--stone)', fontFamily: 'DM Sans, sans-serif',
                  }}>
                    {story.author} · {new Date(story.createdAt).getFullYear()}
                  </div>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
                    fontSize: '1.6rem', fontWeight: 400, lineHeight: '1.2', marginBottom: '1rem',
                    color: i % 3 === 0 ? 'var(--cream)' : 'var(--ink)',
                  }}>
                    {story.title}
                  </h3>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '0.875rem',
                    lineHeight: '1.7', color: i % 3 === 0 ? 'rgba(247,243,238,0.65)' : 'var(--ink-light)',
                    display: expandedStory === story.id ? 'block' : '-webkit-box',
                    WebkitLineClamp: expandedStory === story.id ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                  }}>
                    {story.content}
                  </p>
                  <button style={{
                    marginTop: '1.5rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    color: i % 3 === 0 ? 'var(--gold)' : 'var(--gold-dark)',
                    fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    {expandedStory === story.id ? '←' : tx.stories.readMore + ' →'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contact" style={{ padding: '8rem 0', backgroundColor: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'grid', gap: '6rem', alignItems: 'start' }} className="contact-grid">
            {/* Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--gold)' }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>
                  {tx.contact.label}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', lineHeight: '1.1', color: 'var(--ink)',
                marginBottom: '1.5rem', whiteSpace: 'pre-line',
              }}>
                {tx.contact.title}
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--ink-light)', marginBottom: '3rem' }}>
                {tx.contact.sub}
              </p>

              {/* Infos de contato */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {settings?.phone && (
                  <a href={`tel:${settings.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--ink-light)' }}>
                    <div style={{ width: '36px', height: '36px', border: '1px solid var(--stone-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={14} style={{ color: 'var(--gold)' }} />
                    </div>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{settings.phone}</span>
                  </a>
                )}
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--ink-light)' }}>
                    <div style={{ width: '36px', height: '36px', border: '1px solid var(--stone-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={14} style={{ color: 'var(--gold)' }} />
                    </div>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{settings.email}</span>
                  </a>
                )}
                {settings?.address && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', border: '1px solid var(--stone-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={14} style={{ color: 'var(--gold)' }} />
                    </div>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'var(--ink-light)', lineHeight: '1.6' }}>{settings.address}</span>
                  </div>
                )}
                {/* Social */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  {settings?.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                      style={{ width: '36px', height: '36px', border: '1px solid var(--stone-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.backgroundColor = 'var(--gold)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--stone-light)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
                      <Instagram size={14} style={{ color: 'var(--ink)' }} />
                    </a>
                  )}
                  {settings?.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                      style={{ width: '36px', height: '36px', border: '1px solid var(--stone-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.backgroundColor = 'var(--gold)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--stone-light)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
                      <Facebook size={14} style={{ color: 'var(--ink)' }} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { key: 'name', label: tx.contact.name, type: 'text', required: true },
                { key: 'email', label: tx.contact.email, type: 'email', required: true },
                { key: 'phone', label: tx.contact.phone, type: 'tel', required: false },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                    {field.label}
                  </label>
                  <input type={field.type} required={field.required}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '0.875rem 1rem', backgroundColor: 'transparent',
                      border: '1px solid var(--stone-light)', color: 'var(--ink)', outline: 'none',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--stone-light)')}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                  {tx.contact.message}
                </label>
                <textarea required rows={5} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    width: '100%', padding: '0.875rem 1rem', backgroundColor: 'transparent',
                    border: '1px solid var(--stone-light)', color: 'var(--ink)', outline: 'none', resize: 'vertical',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--stone-light)')}
                />
              </div>

              <button type="submit" disabled={formStatus === 'sending'}
                style={{
                  backgroundColor: formStatus === 'success' ? 'var(--sage)' : formStatus === 'error' ? 'var(--rust)' : 'var(--ink)',
                  color: 'var(--cream)', padding: '1rem 2rem', border: 'none', cursor: formStatus === 'sending' ? 'wait' : 'pointer',
                  fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: 'DM Sans, sans-serif', transition: 'background-color 0.3s', width: '100%',
                }}>
                {formStatus === 'sending' ? tx.contact.sending : formStatus === 'success' ? tx.contact.success : formStatus === 'error' ? tx.contact.error : tx.contact.send}
              </button>
            </form>
          </div>
        </div>
        <style>{`
          .contact-grid { grid-template-columns: 1fr 1fr; }
          @media(max-width:768px){ .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }
        `}</style>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: 'var(--ink)', padding: '3rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MouraLogo size={32} light />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--cream)' }}>MOURA</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(247,243,238,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
                {tx.footer.made}
              </p>
            </div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(247,243,238,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
              {tx.footer.copy}
            </p>
          </div>
          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(247,243,238,0.1)', paddingTop: '1.5rem', textAlign: 'center' }}>
            <a href="/admin" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,243,238,0.2)', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
              Admin
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
