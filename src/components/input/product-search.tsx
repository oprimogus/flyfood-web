import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function ProductSearch() {
  return (
    <div className="flex space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Procurar no cardápio do restaurante..."
        className="flex-grow"
      />
      <Button type="submit" className="bg-red-600">
        <MagnifyingGlassIcon className="w-4 h-4 mr-2 bg-red-600" />
        Buscar
      </Button>
    </div>
  );
}
