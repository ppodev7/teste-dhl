/**
 * Header - Cabeçalho do dashboard
 * 
 * Design: Dark e minimalista
 * Logo centralizado
 */

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="p-2">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-center pt-8 text-zinc-100">
          ZYX Logística
        </h1>

        <p className="text-xl text-center pt-4 text-zinc-500">
          Seja bem-vindo ao painel!
        </p>

        <hr className="my-6 border-zinc-800" />
      </div>
    </header>
  );
}
