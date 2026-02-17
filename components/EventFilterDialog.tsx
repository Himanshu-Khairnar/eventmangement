import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type EventFilterDialogProps = {
  committees: string[];
  categoryFilter: string;
  committeeFilter: string;
  onCategoryChange: (category: string) => void;
  onCommitteeChange: (committee: string) => void;
  onClearFilters: () => void;
};

const categories = ['Technical', 'Cultural', 'Sports', 'Workshop'];

export default function EventFilterDialog({
  committees,
  categoryFilter,
  committeeFilter,
  onCategoryChange,
  onCommitteeChange,
  onClearFilters
}: EventFilterDialogProps) {

  const activeFiltersCount = (categoryFilter !== 'all' ? 1 : 0) + (committeeFilter !== 'all' ? 1 : 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 h-10 border-white/10 bg-background/50 backdrop-blur-md">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
          <DialogDescription>
            Refine your search by category or committee.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger id="category" className="bg-background/50 border-white/10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="committee" className="text-sm font-medium">
              Committee
            </Label>
            <Select value={committeeFilter} onValueChange={onCommitteeChange}>
              <SelectTrigger id="committee" className="bg-background/50 border-white/10">
                <SelectValue placeholder="Select committee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Committees</SelectItem>
                {committees.map(com => (
                  <SelectItem key={com} value={com}>{com}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between items-center gap-2">
          {activeFiltersCount > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              <X className="mr-2 h-3 w-3" />
              Reset Filters
            </Button>
          ) : <div />}
          <DialogClose asChild>
            <Button type="submit">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
