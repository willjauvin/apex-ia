export default function ReportsPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Rapports</h1>

      <div className="space-y-6">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-2">Rapports automatiques</h2>
          <p className="text-gray-600">Génération IA bientôt disponible…</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-2">Exportation</h2>
          <p className="text-gray-600">Formats PDF/Excel en préparation…</p>
        </div>
      </div>
    </main>
  )
}

