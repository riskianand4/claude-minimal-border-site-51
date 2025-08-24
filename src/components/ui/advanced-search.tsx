import { useState } from "react"
import { Search, Filter, X, SortAsc, SortDesc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface SearchFilter {
  key: string
  label: string
  type: 'text' | 'select' | 'checkbox' | 'date'
  options?: { value: string; label: string }[]
  value?: any
}

export interface SortOption {
  key: string
  label: string
  direction: 'asc' | 'desc'
}

interface AdvancedSearchProps {
  placeholder?: string
  filters?: SearchFilter[]
  sortOptions?: SortOption[]
  onSearch: (query: string) => void
  onFilter: (filters: Record<string, any>) => void
  onSort: (sort: SortOption | null) => void
  className?: string
}

export function AdvancedSearch({
  placeholder = "Search...",
  filters = [],
  sortOptions = [],
  onSearch,
  onFilter,
  onSort,
  className
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters }
    if (value === "" || value === null || value === undefined) {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    setActiveFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilter = (key: string) => {
    const newFilters = { ...activeFilters }
    delete newFilters[key]
    setActiveFilters(newFilters)
    onFilter(newFilters)
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    onFilter({})
  }

  const handleSort = (sortKey: string) => {
    const currentSortForKey = currentSort?.key === sortKey ? currentSort : null
    const newDirection = currentSortForKey?.direction === 'asc' ? 'desc' : 'asc'
    
    const newSort = {
      key: sortKey,
      label: sortOptions.find(s => s.key === sortKey)?.label || sortKey,
      direction: newDirection
    } as SortOption

    setCurrentSort(newSort)
    onSort(newSort)
  }

  const activeFilterCount = Object.keys(activeFilters).length

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            data-search
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {filters.length > 0 && (
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-auto p-1 text-xs"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                {filters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    
                    {filter.type === 'select' && (
                      <Select
                        value={activeFilters[filter.key] || ""}
                        onValueChange={(value) => handleFilterChange(filter.key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {filter.type === 'text' && (
                      <Input
                        value={activeFilters[filter.key] || ""}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        placeholder={`Filter by ${filter.label.toLowerCase()}...`}
                      />
                    )}
                    
                    {filter.type === 'checkbox' && filter.options && (
                      <div className="space-y-2">
                        {filter.options.map((option) => {
                          const isChecked = activeFilters[filter.key]?.includes(option.value)
                          return (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${filter.key}-${option.value}`}
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const currentValues = activeFilters[filter.key] || []
                                  const newValues = checked
                                    ? [...currentValues, option.value]
                                    : currentValues.filter((v: string) => v !== option.value)
                                  handleFilterChange(filter.key, newValues.length > 0 ? newValues : null)
                                }}
                              />
                              <label
                                htmlFor={`${filter.key}-${option.value}`}
                                className="text-sm font-normal"
                              >
                                {option.label}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        
        {sortOptions.length > 0 && (
          <Select
            value={currentSort ? `${currentSort.key}-${currentSort.direction}` : ""}
            onValueChange={(value) => {
              if (!value) {
                setCurrentSort(null)
                onSort(null)
                return
              }
              const [key, direction] = value.split('-')
              handleSort(key)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={`${option.key}-asc`} value={`${option.key}-asc`}>
                  <div className="flex items-center">
                    <SortAsc className="h-4 w-4 mr-2" />
                    {option.label} (A-Z)
                  </div>
                </SelectItem>
              ))}
              {sortOptions.map((option) => (
                <SelectItem key={`${option.key}-desc`} value={`${option.key}-desc`}>
                  <div className="flex items-center">
                    <SortDesc className="h-4 w-4 mr-2" />
                    {option.label} (Z-A)
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.key === key)
            if (!filter) return null
            
            const displayValue = Array.isArray(value) 
              ? value.join(', ')
              : filter.options?.find(o => o.value === value)?.label || value
            
            return (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {filter.label}: {displayValue}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter(key)}
                />
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}