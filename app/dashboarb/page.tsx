export default function DashboardPage() {
  const sections = [
    { title: "Analytique", desc: "Visualisez vos données et tendances.", href: "/dashboard/analytics" },
    { title: "Logistique", desc: "Suivi des opérations et du transport.", href: "/dashboard/logistics" },
    { title: "Automatisation", desc: "Automatisez vos processus métier.", href: "/dashboard/automation" },
    { title: "Rapports", desc: "Générez des rapports intelligents.", href: "/dashboard/reports" }
  ]

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">Tableau de bord Apex IA</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border"
          >
            <h2 className="text-2xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-600">{s.desc}</p>
          </a>
        ))}
      </div>
    </main>
  )
}

