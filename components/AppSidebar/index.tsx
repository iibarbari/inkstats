'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UploadIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menu = {
  summary: [
    { title: 'Reading progress', url: '/reading-progress' },
    { title: 'Current progress', url: '/current-progress' },
  ],
  timeRange: [
    { title: 'All books', url: '/time-range/all-books' },
    { title: 'Books by week', url: '/time-range/books-by-week' },
    { title: 'Books by month', url: '/time-range/books-by-month' },
    { title: 'Last month by day', url: '/time-range/books-by-year' },
    { title: 'Last year by day', url: '/time-range/books-by-year' },
    { title: 'Last year by week', url: '/time-range/books-by-year' },
  ],
  calendarView: [
    { title: 'Monthly view', url: '/calender-view/monthly-view' },
    { title: 'Daily view', url: '/calender-view/daily-view' },
  ],
};

function SidebarLinkItem({ title, url }: { title: string; url: string }) {
  const pathname = usePathname();
  const active = pathname === url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <Link href={url}>{title}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="text-2xl font-semibold">
              <Link href="/">inkstats</Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Summary</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.summary.map((item) => (
                <SidebarLinkItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Time range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.timeRange.map((item) => (
                <SidebarLinkItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Calendar view</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.calendarView.map((item) => (
                <SidebarLinkItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/upload">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload new file
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
