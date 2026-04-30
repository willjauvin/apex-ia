"use client"

import { motion } from "framer-motion"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white">
      
      {/* HERO */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent"
        >
          Choisissez votre plan SimpliGenIa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Une technologie intelligente, une expérience premium. Aucun détail technique affiché — seulement la performance.
        </motion.p>
      </section>

      {/* PRICING GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 pb-24 max-w-7xl mx-auto">

        {/* FREE */}
        <PricingCard
          title="Free"
          price="0$"
          period="CAD / mois"
          features={[
            "100 messages / jour",
            "Chat normal",
            "Assistant branding",
            "Mémoire courte",
            "Performance standard"
          ]}
          highlight={false}
        />

        {/* STARTER */}
        <PricingCard
          title="Starter"
          price="9$"
          period="CAD / mois"
          features={[
            "Messages illimités",
            "Chat normal + branding",
            "Assistant commercial",
            "Mémoire améliorée",
            "Performance optimisée"
          ]}
          highlight={false}
        />

        {/* PRO */}
        <PricingCard
          title="Pro"
          price="29$"
          period="CAD / mois"
          features={[
            "Messages illimités",
            "Tous les assistants",
            "Mémoire longue durée",
            "Outils avancés",
            "Performance professionnelle"
          ]}
          highlight={true}
        />

        {/* BUSINESS */}
        <PricingCard
          title="Business"
          price="79$"
          period="CAD / mois"
          features={[
            "Tout illimité",
            "Multi‑utilisateurs",
            "Priorité support",
            "Orchestration intelligente",
            "Performance entreprise"
          ]}
          highlight={false}
        />

      </section>

      {/* CTA FINAL */}
      <section className="text-center py-20 bg-black/40 backdrop-blur-xl">
        <h2 className="text-3xl font-bold">Prêt à propulser votre productivité ?</h2>
        <p className="text-gray-400 mt-2">SimpliGenIa vous accompagne à chaque étape.</p>
        <button className="mt-6 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold shadow-lg hover:opacity-90 transition">
          Commencer maintenant
        </button>
      </section>
    </div>
  )
}

function PricingCard({ title, price, period, features, highlight }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-8 rounded-2xl backdrop-blur-xl border 
        ${highlight ? "border-orange-500 bg-white/10 shadow-2xl scale-105" : "border-white/10 bg-white/5"}
        hover:scale-105 transition cursor-pointer`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-4xl font-extrabold">{price}</p>
      <p className="text-gray-400">{period}</p>

      <ul className="mt-6 space-y-3 text-gray-300">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-orange-400">•</span> {f}
          </li>
        ))}
      </ul>

      <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:opacity-90 transition">
        Choisir
      </button>
    </motion.div>
  )
}

