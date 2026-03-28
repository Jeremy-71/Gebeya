// ProductFilters.tsx
import { Input } from "@/components/ui/input";

export default function ProductFilters() {
  return (
    <div className="flex gap-4">
      <Input placeholder="Search products..." />
    </div>
  );
}