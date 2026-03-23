import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, Settings, MessageSquare,
  Plus, Pencil, Trash2, Check, X, Eye, EyeOff, LogOut,
  ChevronRight, Mail, Phone, Globe, Save, AlertCircle
} from 'lucide-react'

// ─── Autenticação simples ───────────────────────────────────────
const ADMIN_PASS = 'moura2025'

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem('moura_admin', '1')
      onLogin()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--ink)', fontFamily: 'DM Sans, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <MouraLogoSVG size={56} light />
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--cream)', marginTop: '1rem' }}>
            MOURA
          </h1>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: '0.5rem' }}>
            Painel Administrativo
          </p>
        </div>

        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.5rem' }}>
              Senha
            </label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} autoFocus
              placeholder="••••••••"
              style={{
                width: '100%', padding: '0.875rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)',
                border: `1px solid ${error ? 'var(--rust)' : 'rgba(247,243,238,0.15)'}`,
                color: 'var(--cream)', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
                transition: 'border-color 0.2s',
              }}
            />
            {error && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={12} /> Senha incorreta
              </p>
            )}
          </div>
          <button type="submit" style={{
            backgroundColor: 'var(--gold)', color: 'var(--ink)', padding: '0.9rem',
            border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontWeight: 500, marginTop: '0.5rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Logo SVG ───────────────────────────────────────────────────
function MouraLogoSVG({ size = 36, light = false }: { size?: number; light?: boolean }) {
  const color = light ? '#F7F3EE' : '#1A1714'
  const gold = '#C9A96E'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke={gold} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M22 68 L22 35 L50 55 L78 35 L78 68" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="55" x2="50" y2="68" stroke={gold} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="28" r="3" fill={gold}/>
    </svg>
  )
}

// ─── Layout Admin ───────────────────────────────────────────────
const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/stories', label: 'Histórias', icon: BookOpen },
  { to: '/admin/messages', label: 'Mensagens', icon: MessageSquare },
  { to: '/admin/settings', label: 'Configurações', icon: Settings },
]

function AdminLayout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  const [sideOpen, setSideOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', backgroundColor: '#F0EDE8' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', backgroundColor: 'var(--ink)', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
        transition: 'transform 0.3s ease',
      }} className="admin-sidebar">
        {/* Logo */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MouraLogoSVG size={32} light />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--cream)' }}>MOURA</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginTop: '1px' }}>Admin</div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {sidebarLinks.map(link => (
            <NavLink key={link.to} to={link.to} end={link.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '0.75rem 1.5rem', textDecoration: 'none', transition: 'all 0.2s',
                backgroundColor: isActive ? 'rgba(201,169,110,0.12)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                color: isActive ? 'var(--gold)' : 'rgba(247,243,238,0.55)',
                fontSize: '0.82rem', letterSpacing: '0.05em',
              })}>
              <link.icon size={15} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onLogout} style={{
            display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
            padding: '0.75rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(247,243,238,0.4)', fontSize: '0.82rem', letterSpacing: '0.05em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,243,238,0.4)')}>
            <LogOut size={15} /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '2rem', minHeight: '100vh' }} className="admin-main">
        {children}
      </main>

      <style>{`
        @media(max-width:768px){
          .admin-sidebar{transform:translateX(-240px);}
          .admin-main{margin-left:0!important;}
        }
      `}</style>
    </div>
  )
}

// ─── Dashboard ──────────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState({ stories: 0, messages: 0, unread: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stories').then(r => r.json()),
      fetch('/api/admin/messages').then(r => r.json()),
    ]).then(([stories, messages]) => {
      setStats({
        stories: stories.length,
        messages: messages.length,
        unread: messages.filter((m: any) => !m.read).length,
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Histórias cadastradas', value: stats.stories, icon: BookOpen, color: 'var(--gold)' },
    { label: 'Mensagens recebidas', value: stats.messages, icon: MessageSquare, color: 'var(--sage)' },
    { label: 'Mensagens não lidas', value: stats.unread, icon: Mail, color: 'var(--rust)' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.5rem' }}>
        Bem-vindo ao painel
      </h1>
      <p style={{ color: 'var(--stone)', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
        Gerencie as histórias, mensagens e configurações da Moura.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {cards.map(card => (
          <div key={card.label} style={{
            backgroundColor: '#fff', padding: '1.75rem', borderRadius: '2px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderTop: `3px solid ${card.color}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--stone)', marginTop: '0.4rem', letterSpacing: '0.03em' }}>{card.label}</div>
              </div>
              <card.icon size={22} style={{ color: card.color, opacity: 0.7 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1rem' }}>Acesso rápido</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Nova história', to: '/admin/stories' },
            { label: 'Ver mensagens', to: '/admin/messages' },
            { label: 'Configurações', to: '/admin/settings' },
          ].map(link => (
            <a key={link.to} href={link.to} style={{
              display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
              backgroundColor: 'var(--cream)', color: 'var(--ink)', padding: '0.6rem 1.2rem',
              fontSize: '0.8rem', letterSpacing: '0.05em', transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--cream)')}>
              {link.label} <ChevronRight size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Stories ────────────────────────────────────────────────────
interface Story {
  id?: string; title: string; content: string; author: string; lang: string; published: boolean
}
const emptyStory: Story = { title: '', content: '', author: '', lang: 'it', published: false }

function StoriesAdmin() {
  const [stories, setStories] = useState<Story[]>([])
  const [editing, setEditing] = useState<Story | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const load = () => fetch('/api/admin/stories').then(r => r.json()).then(setStories).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const method = isNew ? 'POST' : 'PUT'
      const url = isNew ? '/api/admin/stories' : `/api/admin/stories/${editing.id}`
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      await load()
      setEditing(null)
      setIsNew(false)
    } catch { /* silently fail */ }
    setSaving(false)
  }

  const del = async (id: string) => {
    await fetch(`/api/admin/stories/${id}`, { method: 'DELETE' })
    await load()
    setDeleteConfirm(null)
  }

  const togglePublish = async (s: Story) => {
    await fetch(`/api/admin/stories/${s.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...s, published: !s.published }),
    })
    await load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, color: 'var(--ink)' }}>Histórias</h1>
          <p style={{ color: 'var(--stone)', fontSize: '0.875rem' }}>{stories.length} histórias cadastradas</p>
        </div>
        <button onClick={() => { setEditing({ ...emptyStory }); setIsNew(true) }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--ink)',
            color: 'var(--cream)', padding: '0.7rem 1.25rem', border: 'none', cursor: 'pointer',
            fontSize: '0.8rem', letterSpacing: '0.08em',
          }}>
          <Plus size={15} /> Nova história
        </button>
      </div>

      {/* Modal edição */}
      {editing && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(26,23,20,0.7)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto', borderRadius: '2px' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--stone-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)' }}>
                {isNew ? 'Nova história' : 'Editar história'}
              </h2>
              <button onClick={() => { setEditing(null); setIsNew(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--stone)' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { key: 'title', label: 'Título', type: 'text' },
                { key: 'author', label: 'Autor', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} value={(editing as any)[f.key]}
                    onChange={e => setEditing(v => v ? { ...v, [f.key]: e.target.value } : v)}
                    style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Idioma</label>
                <select value={editing.lang} onChange={e => setEditing(v => v ? { ...v, lang: e.target.value } : v)} style={inputStyle}>
                  <option value="it">🇮🇹 Italiano</option>
                  <option value="pt">🇧🇷 Português</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Conteúdo</label>
                <textarea rows={8} value={editing.content}
                  onChange={e => setEditing(v => v ? { ...v, content: e.target.value } : v)}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="pub" checked={editing.published}
                  onChange={e => setEditing(v => v ? { ...v, published: e.target.checked } : v)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                <label htmlFor="pub" style={{ fontSize: '0.85rem', color: 'var(--ink)', cursor: 'pointer' }}>
                  Publicar na landing page
                </label>
              </div>
            </div>
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid var(--stone-light)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => { setEditing(null); setIsNew(false) }} style={btnSecondary}>Cancelar</button>
              <button onClick={save} disabled={saving} style={btnPrimary}>
                <Save size={14} /> {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {stories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff', color: 'var(--stone)' }}>
            Nenhuma história ainda. Crie a primeira!
          </div>
        )}
        {stories.map(s => (
          <div key={s.id} style={{
            backgroundColor: '#fff', padding: '1.25rem 1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 400, color: 'var(--ink)' }}>{s.title}</span>
                <span style={{ fontSize: '0.65rem', padding: '2px 6px', backgroundColor: s.lang === 'it' ? '#E8F0FE' : '#FEF3C7', color: s.lang === 'it' ? '#1a56db' : '#92400e', borderRadius: '2px' }}>
                  {s.lang === 'it' ? '🇮🇹 IT' : '🇧🇷 PT'}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--stone)', marginTop: '2px' }}>por {s.author}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => togglePublish(s)} title={s.published ? 'Ocultar' : 'Publicar'} style={{ ...iconBtn, color: s.published ? 'var(--sage)' : 'var(--stone)' }}>
                {s.published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => { setEditing(s); setIsNew(false) }} style={iconBtn}>
                <Pencil size={15} />
              </button>
              {deleteConfirm === s.id ? (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => del(s.id!)} style={{ ...iconBtn, color: 'var(--rust)' }}><Check size={15} /></button>
                  <button onClick={() => setDeleteConfirm(null)} style={iconBtn}><X size={15} /></button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(s.id!)} style={{ ...iconBtn, color: 'var(--rust)' }}><Trash2 size={15} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mensagens ──────────────────────────────────────────────────
interface Msg { id: string; name: string; email: string; phone?: string; message: string; lang: string; read: boolean; createdAt: string }

function MessagesAdmin() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [selected, setSelected] = useState<Msg | null>(null)

  const load = () => fetch('/api/admin/messages').then(r => r.json()).then(setMessages).catch(() => {})
  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}/read`, { method: 'PUT' })
    await load()
    setSelected(s => s ? { ...s, read: true } : s)
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.5rem' }}>Mensagens</h1>
      <p style={{ color: 'var(--stone)', fontSize: '0.875rem', marginBottom: '2rem' }}>{messages.filter(m => !m.read).length} não lidas</p>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1rem' }} className="msg-grid">
        {/* Lista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff', color: 'var(--stone)' }}>Nenhuma mensagem ainda.</div>
          )}
          {messages.map(m => (
            <div key={m.id} onClick={() => { setSelected(m); if (!m.read) markRead(m.id) }}
              style={{
                backgroundColor: '#fff', padding: '1rem 1.25rem', cursor: 'pointer',
                borderLeft: `3px solid ${!m.read ? 'var(--gold)' : 'transparent'}`,
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAF8F5')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: m.read ? 400 : 500, color: 'var(--ink)' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--stone)', marginTop: '2px' }}>{m.email}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--stone)' }}>{new Date(m.createdAt).toLocaleDateString('pt-BR')}</div>
                  {!m.read && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold)', marginLeft: 'auto', marginTop: '4px' }} />}
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--stone)', marginTop: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.message}
              </p>
            </div>
          ))}
        </div>

        {/* Detalhe */}
        {selected && (
          <div style={{ backgroundColor: '#fff', padding: '2rem', position: 'sticky', top: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400 }}>{selected.name}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--stone)' }}><X size={18} /></button>
            </div>
            {[
              { icon: Mail, text: selected.email, href: `mailto:${selected.email}` },
              selected.phone ? { icon: Phone, text: selected.phone, href: `tel:${selected.phone}` } : null,
              { icon: Globe, text: selected.lang === 'it' ? '🇮🇹 Italiano' : '🇧🇷 Português', href: '' },
            ].filter(Boolean).map((item: any, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <item.icon size={14} style={{ color: 'var(--stone)', flexShrink: 0 }} />
                {item.href ? (
                  <a href={item.href} style={{ fontSize: '0.85rem', color: 'var(--ink)', textDecoration: 'none' }}>{item.text}</a>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{item.text}</span>
                )}
              </div>
            ))}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--stone-light)' }}>
              <label style={labelStyle}>Mensagem</label>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.75', color: 'var(--ink-light)', whiteSpace: 'pre-wrap' }}>{selected.message}</p>
            </div>
            <div style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--stone)' }}>
              Recebida em {new Date(selected.createdAt).toLocaleString('pt-BR')}
            </div>
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.msg-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

// ─── Configurações ──────────────────────────────────────────────
function SettingsAdmin() {
  const [form, setForm] = useState({ companyName: 'Moura', publicLang: 'it', phone: '', email: '', address: '', instagram: '', facebook: '' })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(s => {
      if (s) setForm({ companyName: s.companyName || 'Moura', publicLang: s.publicLang || 'it', phone: s.phone || '', email: s.email || '', address: s.address || '', instagram: s.instagram || '', facebook: s.facebook || '' })
    }).catch(() => {})
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    try {
      await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  const fields = [
    { key: 'companyName', label: 'Nome da empresa' },
    { key: 'phone', label: 'Telefone' },
    { key: 'email', label: 'E-mail de contato' },
    { key: 'address', label: 'Endereço' },
    { key: 'instagram', label: 'Link Instagram' },
    { key: 'facebook', label: 'Link Facebook' },
  ]

  return (
    <div style={{ maxWidth: '560px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.5rem' }}>Configurações</h1>
      <p style={{ color: 'var(--stone)', fontSize: '0.875rem', marginBottom: '2.5rem' }}>Informações exibidas na landing page.</p>

      <form onSubmit={save} style={{ backgroundColor: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={labelStyle}>{f.label}</label>
            <input value={(form as any)[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} style={inputStyle} />
          </div>
        ))}
        <div>
          <label style={labelStyle}>Idioma padrão da landing page</label>
          <select value={form.publicLang} onChange={e => setForm(v => ({ ...v, publicLang: e.target.value }))} style={inputStyle}>
            <option value="it">🇮🇹 Italiano</option>
            <option value="pt">🇧🇷 Português</option>
          </select>
        </div>
        <button type="submit" disabled={status === 'saving'}
          style={{
            ...btnPrimary, marginTop: '0.5rem',
            backgroundColor: status === 'saved' ? 'var(--sage)' : status === 'error' ? 'var(--rust)' : 'var(--ink)',
          }}>
          <Save size={14} />
          {status === 'saving' ? 'Salvando...' : status === 'saved' ? 'Salvo!' : status === 'error' ? 'Erro ao salvar' : 'Salvar configurações'}
        </button>
      </form>
    </div>
  )
}

// ─── Estilos compartilhados ─────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--stone)', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif',
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 0.875rem', backgroundColor: 'var(--cream)',
  border: '1px solid var(--stone-light)', color: 'var(--ink)', outline: 'none',
  fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem',
}
const btnPrimary: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  backgroundColor: 'var(--ink)', color: 'var(--cream)', padding: '0.75rem 1.5rem',
  border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.08em',
}
const btnSecondary: React.CSSProperties = {
  backgroundColor: 'var(--cream)', color: 'var(--ink)', padding: '0.75rem 1.5rem',
  border: '1px solid var(--stone-light)', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.08em',
}
const iconBtn: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem',
  color: 'var(--stone)', display: 'flex', alignItems: 'center',
  transition: 'color 0.15s',
}

// ─── Main export ─────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('moura_admin') === '1')

  const logout = () => {
    sessionStorage.removeItem('moura_admin')
    setAuthed(false)
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <AdminLayout onLogout={logout}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="stories" element={<StoriesAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Routes>
    </AdminLayout>
  )
}
