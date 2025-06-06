import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 py-4">
      <div className="flex items-center space-x-4 text-sm">
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          variant="outline"
          size="icon"
        >
          <ChevronsLeft />
        </Button>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          variant="outline"
          size="icon"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= pageCount - 1}
          variant="outline"
          size="icon"
        >
          <ChevronRight />
        </Button>
        <Button
          onClick={() => onPageChange(pageCount - 1)}
          disabled={currentPage >= pageCount - 1}
          variant="outline"
          size="icon"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
