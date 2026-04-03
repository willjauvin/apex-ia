export function Navbar() {
  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Apex IA</h1>

      <div className="flex gap-4">
        <a href="/" className="hover:text-blue-600">Accueil</a>
        <a href="/chat" className="hover:text-blue-600">Chat IA</a>
        <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
      </div>
    </nav>
  )
}

