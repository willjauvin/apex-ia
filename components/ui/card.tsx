export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      {children}
    </div>
  )
}

