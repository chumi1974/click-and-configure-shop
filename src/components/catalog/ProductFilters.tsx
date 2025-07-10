import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/types';
import { categories } from '@/data/products';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const ProductFilters = ({ filters, onFiltersChange }: ProductFiltersProps) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      categories: checked 
        ? [...filters.categories, category]
        : filters.categories.filter(c => c !== category)
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 1000],
      inStock: false,
      bundles: false
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filtros</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Limpiar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categorías</Label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, !!checked)
                  }
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Rango de Precio: €{filters.priceRange[0]} - €{filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={1000}
            min={0}
            step={50}
            className="w-full"
          />
        </div>

        {/* Stock Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, inStock: !!checked })
            }
          />
          <Label htmlFor="inStock" className="text-sm">
            Solo productos en stock
          </Label>
        </div>

        {/* Bundles Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bundles"
            checked={filters.bundles}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, bundles: !!checked })
            }
          />
          <Label htmlFor="bundles" className="text-sm">
            Solo bundles
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;