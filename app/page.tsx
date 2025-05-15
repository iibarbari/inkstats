import SummaryCards from '@/components/SummaryCards';
import WeeklyReadingBarChart from '@/components/WeeklyReadingBarChart';

export default function Home() {
  return (
    <main className="grid gap-12 my-16">
      <div className="container">
        <SummaryCards />
      </div>

      <section className="container">
        <div className="grid grid-cols-12">
          <WeeklyReadingBarChart className="col-span-12 lg:col-span-8" />
        </div>
      </section>
    </main>
  );
}
