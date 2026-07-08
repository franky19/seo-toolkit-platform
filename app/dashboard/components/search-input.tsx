import { Input } from "@/components/ui/input";

export function SearchInput() {
  return (
    <Input
      type="search"
      placeholder="Search for keywords or projects..."
      className="h-10 w-[200px] lg:w-[300px]"
    />
  );
}
