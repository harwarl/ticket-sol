export function AppPageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-row justify-left py-4 md:py-4">
      <div className="text-left">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="pt-4">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
