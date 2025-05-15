import Link from 'next/link';

export function SiteHeader() {
  return (
    <header
      className="flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear py-2"
    >
      <div className="container flex w-full items-center gap-1 px-4 lg:gap-2 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">KOReader Reading Stat Viewer</h1>
        </Link>
      </div>
    </header>
  );
}
