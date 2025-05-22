import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Stat } from '@/@types';

type Props = {
  stat: Stat | null;
}

export default function SummaryCard({ stat }: Props) {
  if (stat === null) return null;
  
  return (
    <Card className="@container/card" key={stat.title}>
      <CardHeader className="relative">
        <CardDescription>
          {stat.title}
        </CardDescription>

        <CardTitle
          className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums"
        >{stat.value}</CardTitle>

        {stat.trend && (
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {
                stat.trend.status === "positive" ? (
                  <TrendingUpIcon className="size-3" />
                ) : stat.trend?.status === "negative" ? (
                  <TrendingDownIcon className="size-3" />
                ) : null
              }

              {`${stat.trend.value}%`}
            </Badge>
          </div>
        )}
      </CardHeader>


      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="text-muted-foreground">
          {stat.description}
        </div>
      </CardFooter>
    </Card>
  );
}
