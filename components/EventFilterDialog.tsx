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
        <Button variant="outline" className="gap-2 h-12 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-primary text-black font-black uppercase transition-all rounded-none px-6">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-none p-0 flex items-center justify-center text-[10px] bg-accent text-black border border-black font-black">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase">Filter Events</DialogTitle>
          <DialogDescription className="text-black font-medium">
            Refine your search by category or committee.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-bold text-black uppercase">
              Category
            </Label>
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger id="category" className="bg-white border-2 border-black rounded-none h-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-0 text-black font-bold">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <SelectItem value="all" className="focus:bg-yellow-200 focus:text-black font-bold">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="focus:bg-yellow-200 focus:text-black font-bold">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="committee" className="text-sm font-bold text-black uppercase">
              Committee
            </Label>
            <Select value={committeeFilter} onValueChange={onCommitteeChange}>
              <SelectTrigger id="committee" className="bg-white border-2 border-black rounded-none h-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-0 text-black font-bold">
                <SelectValue placeholder="Select committee" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <SelectItem value="all" className="focus:bg-yellow-200 focus:text-black font-bold">All Committees</SelectItem>
                {committees.map(com => (
                  <SelectItem key={com} value={com} className="focus:bg-yellow-200 focus:text-black font-bold">{com}</SelectItem>
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
                    className="text-black font-bold hover:bg-red-100 hover:text-red-600 rounded-none border-2 border-transparent hover:border-red-600"
                >
                    <X className="mr-2 h-3 w-3" />
                    Reset Filters
                </Button>
            ) : <div />}
            <DialogClose asChild>
                <Button type="submit" className="neubrutalist-btn rounded-none">Done</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
