"use client"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">

      {/* HERO */}
      <section className="flex flex-col items-center text-center pt-24 pb-32 px-6 animate-[fadeInUp_0.4s_ease-out]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 shadow-lg mb-6"></div>

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
          SimpliGenIa
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-xl">
          L’intelligence artificielle qui propulse vos idées, vos projets et vos boutiques SimpliShops.
        </p>

        <a
          href="/chat"
          className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          Démarrer maintenant
        </a>
      </section>

      {/* FEATURES */}
      <section className="px-6 max-w-5xl mx-auto pb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Ce que SimpliGenIa peut faire</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Chat IA intelligent"
            desc="Discutez, posez des questions, obtenez des réponses précises et rapides."
          />
          <FeatureCard
            title="Création de contenu"
            desc="Textes, descriptions, idées, pages complètes… SimpliGenIa génère tout."
          />
          <FeatureCard
            title="Boutiques SimpliShops"
            desc="Générez automatiquement des boutiques complètes et professionnelles."
          />
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="px-6 max-w-5xl mx-auto pb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">Technologie avancée</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            title="Streaming ultra‑rapide"
            desc="Les réponses apparaissent en temps réel pour une expérience fluide."
          />
          <FeatureCard
            title="Mémoire intégrée"
            desc="SimpliGenIa se souvient du contexte et de vos préférences."
          />
          <FeatureCard
            title="Multi‑modèles"
            desc="DeepSeek, Gemini, OpenAI… orchestrés automatiquement."
          />
          <FeatureCard
            title="Sécurité & confidentialité"
            desc="Vos données sont protégées et traitées avec soin."
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center pb-24">
        <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Lancez votre première conversation avec SimpliGenIa.
        </p>

        <a
          href="/chat"
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          Ouvrir SimpliGenIa
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} Jauvin Multitech — Tous droits réservés.
      </footer>
    </main>
  )
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  )
}

