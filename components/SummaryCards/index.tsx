import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

const ReadingTimeCard = dynamic(() => import('./ReadingTimeCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const PagesReadCard = dynamic(() => import('./PagesReadCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const StreakCard = dynamic(() => import('./StreakCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const BooksInProgressCard = dynamic(() => import('./BooksInProgressCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ReadingTimeCard />

      <PagesReadCard />

      <StreakCard />

      <BooksInProgressCard />
    </div>
  );
}
