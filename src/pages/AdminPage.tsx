import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, MessageSquare, Settings, Plus, Trash2, Check, X, LogOut, ChevronRight, Mail, Phone, MapPin, Save, AlertCircle, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'

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
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Routes>
    </AdminLayout>
  )
}
