export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenue sur <span className="text-blue-600">Apex IA</span>
      </h1>

      <p className="text-lg text-gray-700 max-w-xl mb-8">
        Une plateforme intelligente conçue pour automatiser, analyser et optimiser vos opérations.
      </p>

      <a
        href="/chat"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Accéder au Chat IA
      </a>
    </main>
  )
}

