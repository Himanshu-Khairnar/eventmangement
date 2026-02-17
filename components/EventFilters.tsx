import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type EventFiltersProps = {
  committees: string[];
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onCommitteeChange: (committee: string) => void;
};

const categories = ['Technical', 'Cultural', 'Sports'];

export default function EventFilters({ committees, onSearchChange, onCategoryChange, onCommitteeChange }: EventFiltersProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by event name or committee..."
        aria-label="Search events"
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select onValueChange={onCategoryChange} defaultValue="all">
          <SelectTrigger aria-label="Filter by category">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={onCommitteeChange} defaultValue="all">
          <SelectTrigger aria-label="Filter by committee">
            <SelectValue placeholder="Filter by committee" />
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
  );
}
