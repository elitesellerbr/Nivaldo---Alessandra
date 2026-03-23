import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f0] p-6 text-center font-serif">
          <h1 className="mb-4 text-2xl font-light text-[#5A5A40]">Ops! Algo deu errado.</h1>
          <p className="mb-8 text-sm text-black/60">
            {this.state.error?.message || 'Ocorreu um erro inesperado.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-[#1a1a1a] px-8 py-3 text-sm font-medium text-white transition-all hover:bg-black"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
