import React, { useState } from 'react';
import { Plus, Trash2, Save, LogOut, Settings, Image, Video } from 'lucide-react';
import { Story, AppSettings, MediaType } from '../types';
import { TRANSLATIONS, DEFAULT_COMPANY_NAME } from '../constants';

interface AdminPanelProps {
  stories: Story[];
  settings: AppSettings;
  onAddStory: (story: Omit<Story, 'id' | 'createdAt'>) => void;
  onDeleteStory: (id: string) => void;
  onUpdateSettings: (settings: AppSettings) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  stories,
  settings,
  onAddStory,
  onDeleteStory,
  onUpdateSettings,
  onLogout,
}) => {
  const [newStory, setNewStory] = useState<Omit<Story, 'id' | 'createdAt'>>({
    clientName: '',
    beforeUrl: '',
    afterUrl: '',
    type: 'image',
  });

  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  // Sync with global settings if they change (e.g. after initialization)
  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const labels = TRANSLATIONS.pt; // Admin is always in Portuguese

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStory(newStory);
    setNewStory({ clientName: '', beforeUrl: '', afterUrl: '', type: 'image' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 font-serif text-[#1a1a1a]">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 flex items-center justify-between border-b border-black/10 pb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-[#5A5A40]">
              Painel Administrativo
            </h1>
            <p className="text-xs font-medium uppercase tracking-widest text-black/40">
              {DEFAULT_COMPANY_NAME}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all hover:bg-black hover:text-white"
          >
            <LogOut size={14} /> Sair
          </button>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Settings Section */}
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3 text-[#5A5A40]">
              <Settings size={20} />
              <h2 className="text-xl font-medium">Configurações Gerais</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-black/40">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={localSettings.companyName}
                  onChange={(e) => setLocalSettings({ ...localSettings, companyName: e.target.value })}
                  className="w-full rounded-xl border border-black/5 bg-[#f5f5f0] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-black/40">
                  Idioma do Site Público
                </label>
                <select
                  value={localSettings.publicLanguage}
                  onChange={(e) => setLocalSettings({ ...localSettings, publicLanguage: e.target.value as 'it' | 'pt' })}
                  className="w-full rounded-xl border border-black/5 bg-[#f5f5f0] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
                >
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              <button
                onClick={() => onUpdateSettings(localSettings)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5A5A40] py-3 text-sm font-medium text-white transition-all hover:bg-[#4a4a35]"
              >
                <Save size={16} /> Salvar Configurações
              </button>
            </div>
          </section>

          {/* Add Story Section */}
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3 text-[#5A5A40]">
              <Plus size={20} />
              <h2 className="text-xl font-medium">Adicionar Nova Obra</h2>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={newStory.clientName}
                onChange={(e) => setNewStory({ ...newStory, clientName: e.target.value })}
                required
                className="w-full rounded-xl border border-black/5 bg-[#f5f5f0] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
              />
              <input
                type="url"
                placeholder="URL da Mídia Antes"
                value={newStory.beforeUrl}
                onChange={(e) => setNewStory({ ...newStory, beforeUrl: e.target.value })}
                required
                className="w-full rounded-xl border border-black/5 bg-[#f5f5f0] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
              />
              <input
                type="url"
                placeholder="URL da Mídia Depois"
                value={newStory.afterUrl}
                onChange={(e) => setNewStory({ ...newStory, afterUrl: e.target.value })}
                required
                className="w-full rounded-xl border border-black/5 bg-[#f5f5f0] px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#5A5A40]"
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setNewStory({ ...newStory, type: 'image' })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm transition-all ${
                    newStory.type === 'image'
                      ? 'border-[#5A5A40] bg-[#5A5A40] text-white'
                      : 'border-black/5 bg-[#f5f5f0] text-black/40'
                  }`}
                >
                  <Image size={16} /> Imagem
                </button>
                <button
                  type="button"
                  onClick={() => setNewStory({ ...newStory, type: 'video' })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm transition-all ${
                    newStory.type === 'video'
                      ? 'border-[#5A5A40] bg-[#5A5A40] text-white'
                      : 'border-black/5 bg-[#f5f5f0] text-black/40'
                  }`}
                >
                  <Video size={16} /> Vídeo
                </button>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#1a1a1a] py-3 text-sm font-medium text-white transition-all hover:bg-black"
              >
                Adicionar Story
              </button>
            </form>
          </section>
        </div>

        {/* Stories List */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-medium text-[#5A5A40]">Obras Publicadas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <div key={story.id} className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-32 gap-2 overflow-hidden rounded-xl">
                  <img src={story.beforeUrl} className="h-full w-1/2 object-cover opacity-80" referrerPolicy="no-referrer" />
                  <img src={story.afterUrl} className="h-full w-1/2 object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#1a1a1a]">{story.clientName}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-black/30">{story.type}</p>
                  </div>
                  <button
                    onClick={() => onDeleteStory(story.id)}
                    className="rounded-full p-2 text-red-400 transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
