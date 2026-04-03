export default function AnalyticsPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Analytique</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-2">Performance</h2>
          <p className="text-gray-600">Graphique à venir…</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-2">Tendances</h2>
          <p className="text-gray-600">Données en préparation…</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-2">Prévisions IA</h2>
          <p className="text-gray-600">Modèles IA à intégrer…</p>
        </div>
      </div>
    </main>
  )
}

