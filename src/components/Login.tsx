import React from 'react';
import { LogIn } from 'lucide-react';
import { DEFAULT_COMPANY_NAME } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f0] p-6 font-serif">
      <div className="w-full max-w-md rounded-3xl bg-white p-12 shadow-sm">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-light tracking-tight text-[#5A5A40]">
            {DEFAULT_COMPANY_NAME}
          </h1>
          <p className="text-xs font-medium uppercase tracking-widest text-black/40">
            Acesso Administrativo
          </p>
        </div>
        
        <button
          onClick={onLogin}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1a1a1a] py-4 text-sm font-medium text-white transition-all hover:bg-black"
        >
          <LogIn size={18} /> Entrar com Google
        </button>
        
        <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-black/30">
          Apenas administradores autorizados
        </p>
      </div>
    </div>
  );
};
