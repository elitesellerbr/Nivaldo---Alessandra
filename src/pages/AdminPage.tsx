import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, MessageSquare, Settings, Trash2, Check, X, LogOut, ChevronRight, Mail, Phone, MapPin, Save, AlertCircle, Eye, EyeOff, Clock, CheckCircle, XCircle, Image, Upload, Link, Video, Plus } from 'lucide-react'

const ADMIN_PASS = 'moura2025'

function MouraLogo({ size = 36, light = false }: { size?: number; light?: boolean }) {
  const c = light ? '#F7F3EE' : '#1A1714', g = '#C9A96E'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke={g} strokeWidth="1.5" strokeDasharray="4 3"/>
      <path d="M22 68 L22 35 L50 55 L78 35 L78 68" stroke={c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="55" x2="50" y2="68" stroke={g} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="28" r="3" fill={g}/>
    </svg>
  )
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState(''), [error, setError] = useState(false)
  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) { sessionStorage.setItem('moura_admin', '1'); onLogin() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1714', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <MouraLogo size={52} light />
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, letterSpacing: '.2em', color: '#F7F3EE', marginTop: '1rem' }}>MOURA</h1>
          <p style={{ fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#9E9089', marginTop: '.5rem' }}>Painel Administrativo</p>
        </div>
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.68rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#9E9089', marginBottom: '.4rem' }}>Senha</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} autoFocus placeholder="••••••••"
              style={{ width: '100%', padding: '.875rem 1rem', backgroundColor: 'rgba(255,255,255,.06)', border: `1px solid ${error ? '#8B3A2A' : 'rgba(247,243,238,.15)'}`, color: '#F7F3EE', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '.95rem' }} />
            {error && <p style={{ marginTop: '.4rem', fontSize: '.75rem', color: '#E07060', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={12}/>Senha incorreta</p>}
          </div>
          <button type="submit" style={{ backgroundColor: '#C9A96E', color: '#1A1714', padding: '.9rem', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 500, marginTop: '.5rem' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

const sideLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/quotes', label: 'Orçamentos', icon: FileText },
  { to: '/admin/gallery', label: 'Galeria', icon: Image },
  { to: '/admin/messages', label: 'Mensagens', icon: MessageSquare },
  { to: '/admin/settings', label: 'Configurações', icon: Settings },
]

function AdminLayout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', backgroundColor: '#EFECE7' }}>
      <aside style={{ width: '220px', backgroundColor: '#1A1714', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <MouraLogo size={30} light />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, letterSpacing: '.15em', color: '#F7F3EE' }}>MOURA</div>
              <div style={{ fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9E9089' }}>Admin</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '.75rem 0' }}>
          {sideLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px', padding: '.7rem 1.25rem',
              textDecoration: 'none', transition: 'all .2s',
              backgroundColor: isActive ? 'rgba(201,169,110,.12)' : 'transparent',
              borderLeft: isActive ? '2px solid #C9A96E' : '2px solid transparent',
              color: isActive ? '#C9A96E' : 'rgba(247,243,238,.5)',
              fontSize: '.8rem', letterSpacing: '.04em',
            })}>
              <l.icon size={14}/>{l.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '.75rem 0', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '.7rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(247,243,238,.35)', fontSize: '.8rem', letterSpacing: '.04em' }}>
            <LogOut size={14}/>Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, marginLeft: '220px', padding: '2rem', minHeight: '100vh' }}>{children}</main>
    </div>
  )
}

// ── Dashboard ──
function Dashboard() {
  const [stats, setStats] = useState({ quotes: 0, newQuotes: 0, messages: 0, unread: 0 })
  useEffect(() => {
    Promise.all([
      fetch('/api/admin/quotes').then(r => r.json()),
      fetch('/api/admin/messages').then(r => r.json()),
    ]).then(([quotes, messages]) => {
      setStats({ quotes: quotes.length, newQuotes: quotes.filter((q: any) => q.status === 'nuovo').length, messages: messages.length, unread: messages.filter((m: any) => !m.read).length })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Total orçamentos', value: stats.quotes, icon: FileText, color: '#C9A96E' },
    { label: 'Orçamentos novos', value: stats.newQuotes, icon: Clock, color: '#6B7B5E' },
    { label: 'Mensagens', value: stats.messages, icon: MessageSquare, color: '#9E9089' },
    { label: 'Não lidas', value: stats.unread, icon: Mail, color: '#8B3A2A' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#1A1714', marginBottom: '.4rem' }}>Bem-vindo</h1>
      <p style={{ color: '#9E9089', fontSize: '.85rem', marginBottom: '2rem' }}>Gerencie os orçamentos e mensagens da Moura.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ backgroundColor: '#fff', padding: '1.5rem', borderTop: `3px solid ${c.color}`, boxShadow: '0 1px 3px rgba(0,0,0,.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: '#1A1714', lineHeight: 1 }}>{c.value}</div>
                <div style={{ fontSize: '.75rem', color: '#9E9089', marginTop: '.3rem' }}>{c.label}</div>
              </div>
              <c.icon size={20} style={{ color: c.color, opacity: .7 }}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: '#fff', padding: '1.75rem', boxShadow: '0 1px 3px rgba(0,0,0,.05)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#1A1714', marginBottom: '1rem' }}>Acesso rápido</h2>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          {[{ label: 'Ver orçamentos', to: '/admin/quotes' }, { label: 'Ver mensagens', to: '/admin/messages' }, { label: 'Configurações', to: '/admin/settings' }].map(l => (
            <a key={l.to} href={l.to} style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', backgroundColor: '#F7F3EE', color: '#1A1714', padding: '.55rem 1.1rem', fontSize: '.78rem', letterSpacing: '.04em' }}>
              {l.label} <ChevronRight size={12}/>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Orçamentos ──
const STATUS_COLORS: Record<string, string> = { nuovo: '#C9A96E', 'in lavorazione': '#6B7B5E', completato: '#3D6B3D', annullato: '#8B3A2A' }
const STATUS_LABELS: Record<string, string> = { nuovo: 'Novo', 'in lavorazione': 'Em andamento', completato: 'Concluído', annullato: 'Cancelado' }
const STATUS_ICONS: Record<string, any> = { nuovo: Clock, 'in lavorazione': Eye, completato: CheckCircle, annullato: XCircle }

interface Quote { id: string; name: string; email: string; phone: string; address: string; serviceType: string; description: string; budget?: string; status: string; notes?: string; lang: string; createdAt: string }

function QuotesAdmin() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selected, setSelected] = useState<Quote | null>(null)
  const [notes, setNotes] = useState('')
  const [statusVal, setStatusVal] = useState('')
  const [saving, setSaving] = useState(false)
  const [delConfirm, setDelConfirm] = useState<string | null>(null)
  const [filter, setFilter] = useState('todos')

  const load = () => fetch('/api/admin/quotes').then(r => r.json()).then(setQuotes).catch(() => {})
  useEffect(() => { load() }, [])

  const openQuote = (q: Quote) => { setSelected(q); setNotes(q.notes || ''); setStatusVal(q.status) }

  const save = async () => {
    if (!selected) return
    setSaving(true)
    await fetch(`/api/admin/quotes/${selected.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: statusVal, notes }) })
    await load()
    setSelected(s => s ? { ...s, status: statusVal, notes } : s)
    setSaving(false)
  }

  const del = async (id: string) => { await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' }); await load(); setDelConfirm(null); if (selected?.id === id) setSelected(null) }

  const filtered = filter === 'todos' ? quotes : quotes.filter(q => q.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#1A1714' }}>Orçamentos</h1>
          <p style={{ color: '#9E9089', fontSize: '.82rem' }}>{quotes.length} pedidos recebidos</p>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['todos', 'nuovo', 'in lavorazione', 'completato', 'annullato'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '.4rem .875rem', border: '1px solid', borderColor: filter === f ? '#1A1714' : '#D4CEC8', backgroundColor: filter === f ? '#1A1714' : 'transparent', color: filter === f ? '#F7F3EE' : '#9E9089', cursor: 'pointer', fontSize: '.7rem', letterSpacing: '.05em', textTransform: 'capitalize' }}>
              {f === 'todos' ? 'Todos' : STATUS_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', color: '#9E9089', fontSize: '.875rem' }}>Nenhum orçamento nessa categoria.</div>}
          {filtered.map(q => {
            const SI = STATUS_ICONS[q.status] || Clock
            return (
              <div key={q.id} onClick={() => openQuote(q)}
                style={{ backgroundColor: '#fff', padding: '1.1rem 1.25rem', cursor: 'pointer', borderLeft: `3px solid ${STATUS_COLORS[q.status] || '#D4CEC8'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 500, fontSize: '.9rem', color: '#1A1714' }}>{q.name}</span>
                    <span style={{ fontSize: '.65rem', padding: '2px 7px', backgroundColor: `${STATUS_COLORS[q.status]}22`, color: STATUS_COLORS[q.status], borderRadius: '2px', whiteSpace: 'nowrap', fontWeight: 500 }}>
                      {STATUS_LABELS[q.status] || q.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '.78rem', color: '#9E9089', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.serviceType}</div>
                  <div style={{ fontSize: '.75rem', color: '#9E9089', marginTop: '2px' }}>{q.phone} · {new Date(q.createdAt).toLocaleDateString('pt-BR')}</div>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {delConfirm === q.id ? (
                    <>
                      <button onClick={e => { e.stopPropagation(); del(q.id) }} style={{ ...ibtn, color: '#8B3A2A' }}><Check size={13}/></button>
                      <button onClick={e => { e.stopPropagation(); setDelConfirm(null) }} style={ibtn}><X size={13}/></button>
                    </>
                  ) : (
                    <button onClick={e => { e.stopPropagation(); setDelConfirm(q.id) }} style={{ ...ibtn, color: '#8B3A2A' }}><Trash2 size={13}/></button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {selected && (
          <div style={{ backgroundColor: '#fff', padding: '1.75rem', position: 'sticky', top: '1rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: '#1A1714' }}>{selected.name}</h2>
                <span style={{ fontSize: '.65rem', padding: '2px 7px', backgroundColor: `${STATUS_COLORS[selected.status]}22`, color: STATUS_COLORS[selected.status] }}>{STATUS_LABELS[selected.status]}</span>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E9089' }}><X size={18}/></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '1.5rem' }}>
              {[
                { icon: Phone, text: selected.phone, href: `tel:${selected.phone}` },
                selected.email ? { icon: Mail, text: selected.email, href: `mailto:${selected.email}` } : null,
                { icon: MapPin, text: selected.address, href: '' },
              ].filter(Boolean).map((item: any, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <item.icon size={13} style={{ color: '#C9A96E', marginTop: '2px', flexShrink: 0 }}/>
                  {item.href ? <a href={item.href} style={{ fontSize: '.82rem', color: '#1A1714', textDecoration: 'none' }}>{item.text}</a>
                    : <span style={{ fontSize: '.82rem', color: '#3D3530', lineHeight: 1.5 }}>{item.text}</span>}
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#F7F3EE', padding: '1.1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9E9089', marginBottom: '.5rem' }}>Tipo de serviço</div>
              <div style={{ fontSize: '.875rem', fontWeight: 500, color: '#1A1714' }}>{selected.serviceType}</div>
              {selected.budget && <div style={{ fontSize: '.78rem', color: '#6B7B5E', marginTop: '.25rem' }}>Budget: {selected.budget}</div>}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9E9089', marginBottom: '.5rem' }}>Descrição</div>
              <p style={{ fontSize: '.875rem', lineHeight: 1.7, color: '#3D3530', whiteSpace: 'pre-wrap' }}>{selected.description}</p>
            </div>

            <div style={{ borderTop: '1px solid #D4CEC8', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
              <div>
                <label style={lbl2}>Status</label>
                <select value={statusVal} onChange={e => setStatusVal(e.target.value)} style={{ ...inp2, cursor: 'pointer' }}>
                  {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl2}>Notas internas</label>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Adicione notas sobre este orçamento..." style={{ ...inp2, resize: 'vertical' }}/>
              </div>
              <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#1A1714', color: '#F7F3EE', padding: '.7rem', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.08em' }}>
                <Save size={13}/> {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '.7rem', color: '#9E9089' }}>Recebido em {new Date(selected.createdAt).toLocaleString('pt-BR')}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Mensagens ──
interface Msg { id: string; name: string; email: string; phone?: string; message: string; lang: string; read: boolean; createdAt: string }

function MessagesAdmin() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [selected, setSelected] = useState<Msg | null>(null)

  const load = () => fetch('/api/admin/messages').then(r => r.json()).then(setMessages).catch(() => {})
  useEffect(() => { load() }, [])

  const markRead = async (id: string) => { await fetch(`/api/admin/messages/${id}/read`, { method: 'PUT' }); await load(); setSelected(s => s ? { ...s, read: true } : s) }

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#1A1714', marginBottom: '.4rem' }}>Mensagens</h1>
      <p style={{ color: '#9E9089', fontSize: '.82rem', marginBottom: '1.5rem' }}>{messages.filter(m => !m.read).length} não lidas</p>
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {messages.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', color: '#9E9089', fontSize: '.875rem' }}>Nenhuma mensagem ainda.</div>}
          {messages.map(m => (
            <div key={m.id} onClick={() => { setSelected(m); if (!m.read) markRead(m.id) }}
              style={{ backgroundColor: '#fff', padding: '1rem 1.25rem', cursor: 'pointer', borderLeft: `3px solid ${!m.read ? '#C9A96E' : 'transparent'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: !m.read ? 500 : 400, fontSize: '.875rem', color: '#1A1714' }}>{m.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '.7rem', color: '#9E9089' }}>{new Date(m.createdAt).toLocaleDateString('pt-BR')}</span>
                  {!m.read && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C9A96E' }}/>}
                </div>
              </div>
              <p style={{ fontSize: '.78rem', color: '#9E9089', marginTop: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</p>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ backgroundColor: '#fff', padding: '1.75rem', position: 'sticky', top: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400 }}>{selected.name}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E9089' }}><X size={18}/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '1.5rem' }}>
              {selected.email && <a href={`mailto:${selected.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.85rem', color: '#1A1714', textDecoration: 'none' }}><Mail size={13} style={{ color: '#C9A96E' }}/>{selected.email}</a>}
              {selected.phone && <a href={`tel:${selected.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.85rem', color: '#1A1714', textDecoration: 'none' }}><Phone size={13} style={{ color: '#C9A96E' }}/>{selected.phone}</a>}
            </div>
            <div style={{ borderTop: '1px solid #D4CEC8', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9E9089', marginBottom: '.5rem' }}>Mensagem</div>
              <p style={{ fontSize: '.875rem', lineHeight: 1.75, color: '#3D3530', whiteSpace: 'pre-wrap' }}>{selected.message}</p>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '.7rem', color: '#9E9089' }}>Recebida em {new Date(selected.createdAt).toLocaleString('pt-BR')}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Configurações ──
function SettingsAdmin() {
  const [form, setForm] = useState({ companyName: 'Moura', ownerName: 'Nivaldo Moura Da Silva', publicLang: 'it', phone: '328 064 2160', email: '', whatsapp: '3280642160', address: 'Via Piacenza, 2 - Limbiate (MB)', vatNumber: 'IT05142890960', instagram: '', facebook: '' })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => { fetch('/api/settings').then(r => r.json()).then(s => { if (s) setForm(f => ({ ...f, ...s })) }).catch(() => {}) }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('saving')
    try {
      await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus('saved'); setTimeout(() => setStatus('idle'), 2500)
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 2500) }
  }

  const fields = [
    { key: 'companyName', label: 'Nome da empresa' }, { key: 'ownerName', label: 'Nome do proprietário' },
    { key: 'phone', label: 'Telefone' }, { key: 'whatsapp', label: 'WhatsApp (só números)' },
    { key: 'email', label: 'E-mail' }, { key: 'address', label: 'Endereço' },
    { key: 'vatNumber', label: 'P.IVA / Partita IVA' },
    { key: 'instagram', label: 'Link Instagram' }, { key: 'facebook', label: 'Link Facebook' },
  ]

  return (
    <div style={{ maxWidth: '540px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#1A1714', marginBottom: '.4rem' }}>Configurações</h1>
      <p style={{ color: '#9E9089', fontSize: '.82rem', marginBottom: '2rem' }}>Informações exibidas no site.</p>
      <form onSubmit={save} style={{ backgroundColor: '#fff', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={lbl2}>{f.label}</label>
            <input value={(form as any)[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} style={inp2}/>
          </div>
        ))}
        <div>
          <label style={lbl2}>Idioma padrão da landing page</label>
          <select value={form.publicLang} onChange={e => setForm(v => ({ ...v, publicLang: e.target.value }))} style={{ ...inp2, cursor: 'pointer' }}>
            <option value="it">🇮🇹 Italiano</option>
            <option value="pt">🇧🇷 Português</option>
          </select>
        </div>
        <button type="submit" disabled={status === 'saving'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', backgroundColor: status === 'saved' ? '#6B7B5E' : status === 'error' ? '#8B3A2A' : '#1A1714', color: '#F7F3EE', padding: '.85rem', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '.25rem' }}>
          <Save size={13}/> {status === 'saving' ? 'Salvando...' : status === 'saved' ? 'Salvo!' : status === 'error' ? 'Erro ao salvar' : 'Salvar configurações'}
        </button>
      </form>
    </div>
  )
}

// ── Galeria ──
interface MediaItem { id: string; type: string; title: string; url: string; thumbnail?: string; published: boolean; order: number; createdAt: string }

function GalleryAdmin() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [tab, setTab] = useState<'photo' | 'video'>('photo')
  const [uploading, setUploading] = useState(false)
  const [delConfirm, setDelConfirm] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [addingVideo, setAddingVideo] = useState(false)

  const load = () => fetch('/api/admin/media').then(r => r.json()).then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const photos = items.filter(i => i.type === 'photo')
  const videos = items.filter(i => i.type === 'video')

  // Upload foto — converte para base64 e envia
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) { alert(`${file.name} é maior que 5MB. Reduza o tamanho da imagem.`); continue }
      const base64 = await new Promise<string>((res, rej) => {
        const r = new FileReader()
        r.onload = () => res(r.result as string)
        r.onerror = rej
        r.readAsDataURL(file)
      })
      await fetch('/api/admin/media', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'photo', title: file.name.replace(/\.[^.]+$/, ''), url: base64 }),
      })
    }
    await load()
    setUploading(false)
    e.target.value = ''
  }

  // Extrair ID do YouTube/Vimeo
  const getYoutubeId = (url: string) => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return m ? m[1] : null
  }
  const getVimeoId = (url: string) => {
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    return m ? m[1] : null
  }

  const addVideo = async () => {
    if (!videoUrl.trim()) return
    const ytId = getYoutubeId(videoUrl)
    const vmId = getVimeoId(videoUrl)
    let embedUrl = '', thumbnail = ''
    if (ytId) {
      embedUrl = `https://www.youtube.com/embed/${ytId}`
      thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    } else if (vmId) {
      embedUrl = `https://player.vimeo.com/video/${vmId}`
    } else {
      alert('Link inválido. Use YouTube ou Vimeo.'); return
    }
    await fetch('/api/admin/media', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'video', title: videoTitle || 'Vídeo', url: embedUrl, thumbnail }),
    })
    setVideoUrl(''); setVideoTitle(''); setAddingVideo(false)
    await load()
  }

  const togglePublish = async (item: MediaItem) => {
    await fetch(`/api/admin/media/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: item.title, published: !item.published, order: item.order }) })
    await load()
  }

  const del = async (id: string) => {
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    await load(); setDelConfirm(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#1A1714' }}>Galeria</h1>
          <p style={{ color: '#9E9089', fontSize: '.82rem' }}>{photos.length} fotos · {videos.length} vídeos</p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          {/* Upload fotos */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#1A1714', color: '#F7F3EE', padding: '.65rem 1.25rem', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            <Upload size={14} />
            {uploading ? 'Enviando...' : 'Enviar fotos'}
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
          {/* Adicionar vídeo */}
          <button onClick={() => setAddingVideo(true)} style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: 'transparent', color: '#1A1714', border: '1px solid #D4CEC8', padding: '.65rem 1.25rem', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            <Link size={14} /> Adicionar vídeo
          </button>
        </div>
      </div>

      {/* Modal adicionar vídeo */}
      {addingVideo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(26,23,20,.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '480px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: '#1A1714' }}>Adicionar vídeo</h2>
              <button onClick={() => setAddingVideo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E9089' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={lbl2}>Título do vídeo</label>
                <input value={videoTitle} onChange={e => setVideoTitle(e.target.value)} placeholder="Ex: Ristrutturazione Via Modena" style={inp2} />
              </div>
              <div>
                <label style={lbl2}>Link YouTube ou Vimeo</label>
                <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." style={inp2} />
                <p style={{ fontSize: '.72rem', color: '#9E9089', marginTop: '.35rem' }}>Aceita links do YouTube e Vimeo</p>
              </div>
              <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
                <button onClick={() => setAddingVideo(false)} style={{ padding: '.65rem 1.25rem', border: '1px solid #D4CEC8', background: 'none', cursor: 'pointer', fontSize: '.78rem' }}>Cancelar</button>
                <button onClick={addVideo} style={{ padding: '.65rem 1.5rem', backgroundColor: '#1A1714', color: '#F7F3EE', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.08em' }}>Adicionar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.25rem', borderBottom: '1px solid #D4CEC8' }}>
        {(['photo', 'video'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '.65rem 1.5rem', border: 'none', borderBottom: tab === t ? '2px solid #C9A96E' : '2px solid transparent', background: 'none', cursor: 'pointer', fontSize: '.8rem', letterSpacing: '.05em', color: tab === t ? '#1A1714' : '#9E9089', fontWeight: tab === t ? 500 : 400, marginBottom: '-1px' }}>
            {t === 'photo' ? <><Image size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Fotos ({photos.length})</> : <><Video size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Vídeos ({videos.length})</>}
          </button>
        ))}
      </div>

      {/* Grid fotos */}
      {tab === 'photo' && (
        <>
          {photos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff', color: '#9E9089' }}>
              <Upload size={32} style={{ marginBottom: '1rem', opacity: .4 }} />
              <p style={{ fontSize: '.875rem' }}>Nenhuma foto ainda. Clique em "Enviar fotos" para começar.</p>
              <p style={{ fontSize: '.75rem', marginTop: '.5rem', opacity: .6 }}>Máximo 5MB por imagem · JPG, PNG, WEBP</p>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2px' }}>
            {photos.map(photo => (
              <div key={photo.id} style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F0EDE8', overflow: 'hidden' }}>
                <img src={photo.url} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: photo.published ? 1 : 0.4 }} />
                {!photo.published && (
                  <div style={{ position: 'absolute', top: '6px', left: '6px', backgroundColor: '#9E9089', color: '#fff', fontSize: '.6rem', padding: '2px 6px', letterSpacing: '.06em' }}>OCULTA</div>
                )}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(26,23,20,0)', transition: 'background-color .2s', display: 'flex', alignItems: 'flex-end' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(26,23,20,.5)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(26,23,20,0)')}>
                  <div style={{ width: '100%', padding: '8px', display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                    <button onClick={() => togglePublish(photo)} title={photo.published ? 'Ocultar' : 'Publicar'} style={{ ...ibtn, backgroundColor: 'rgba(247,243,238,.9)', color: '#1A1714' }}>
                      {photo.published ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                    {delConfirm === photo.id ? (
                      <>
                        <button onClick={() => del(photo.id)} style={{ ...ibtn, backgroundColor: '#8B3A2A', color: '#fff' }}><Check size={13} /></button>
                        <button onClick={() => setDelConfirm(null)} style={{ ...ibtn, backgroundColor: 'rgba(247,243,238,.9)', color: '#1A1714' }}><X size={13} /></button>
                      </>
                    ) : (
                      <button onClick={() => setDelConfirm(photo.id)} style={{ ...ibtn, backgroundColor: 'rgba(247,243,238,.9)', color: '#8B3A2A' }}><Trash2 size={13} /></button>
                    )}
                  </div>
                </div>
                {photo.title && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4px 8px', backgroundColor: 'rgba(26,23,20,.6)', fontSize: '.68rem', color: '#F7F3EE', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.title}</div>}
              </div>
            ))}
            {/* Upload area */}
            <label style={{ aspectRatio: '1', backgroundColor: '#F7F3EE', border: '2px dashed #D4CEC8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '8px' }}>
              <Plus size={24} style={{ color: '#D4CEC8' }} />
              <span style={{ fontSize: '.7rem', color: '#9E9089', letterSpacing: '.05em' }}>Adicionar</span>
              <input type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>
        </>
      )}

      {/* Grid vídeos */}
      {tab === 'video' && (
        <>
          {videos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff', color: '#9E9089' }}>
              <Video size={32} style={{ marginBottom: '1rem', opacity: .4 }} />
              <p style={{ fontSize: '.875rem' }}>Nenhum vídeo ainda. Clique em "Adicionar vídeo" para começar.</p>
              <p style={{ fontSize: '.75rem', marginTop: '.5rem', opacity: .6 }}>Aceita links do YouTube e Vimeo</p>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {videos.map(video => (
              <div key={video.id} style={{ backgroundColor: '#fff', overflow: 'hidden', opacity: video.published ? 1 : 0.6 }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', backgroundColor: '#1A1714' }}>
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Video size={32} style={{ color: 'rgba(247,243,238,.3)' }} />
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(201,169,110,.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A1714"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '.875rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '.82rem', color: '#1A1714', fontWeight: 400, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title || 'Sem título'}</span>
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button onClick={() => togglePublish(video)} style={{ ...ibtn, color: video.published ? '#6B7B5E' : '#9E9089' }}>
                      {video.published ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    {delConfirm === video.id ? (
                      <>
                        <button onClick={() => del(video.id)} style={{ ...ibtn, color: '#8B3A2A' }}><Check size={13} /></button>
                        <button onClick={() => setDelConfirm(null)} style={ibtn}><X size={13} /></button>
                      </>
                    ) : (
                      <button onClick={() => setDelConfirm(video.id)} style={{ ...ibtn, color: '#8B3A2A' }}><Trash2 size={13} /></button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff', borderLeft: '3px solid #C9A96E' }}>
        <p style={{ fontSize: '.78rem', color: '#9E9089', lineHeight: 1.6 }}>
          <strong style={{ color: '#1A1714' }}>Fotos:</strong> máx. 5MB por imagem (JPG, PNG, WEBP). As fotos são salvas diretamente no banco de dados.<br />
          <strong style={{ color: '#1A1714' }}>Vídeos:</strong> cole o link do YouTube ou Vimeo. O vídeo fica hospedado nessas plataformas.
        </p>
      </div>
    </div>
  )
}

const lbl2: React.CSSProperties = { display: 'block', fontSize: '.67rem', letterSpacing: '.13em', textTransform: 'uppercase', color: '#9E9089', marginBottom: '.35rem', fontFamily: 'DM Sans, sans-serif' }
const inp2: React.CSSProperties = { width: '100%', padding: '.7rem .875rem', backgroundColor: '#F7F3EE', border: '1px solid #D4CEC8', color: '#1A1714', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '.875rem' }
const ibtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: '.35rem', color: '#9E9089', display: 'flex', alignItems: 'center' }

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('moura_admin') === '1')
  const logout = () => { sessionStorage.removeItem('moura_admin'); setAuthed(false) }
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />
  return (
    <AdminLayout onLogout={logout}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="quotes" element={<QuotesAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Routes>
    </AdminLayout>
  )
}
