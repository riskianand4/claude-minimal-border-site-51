import { useState } from "react"
import { Trash2, Download, Archive, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { toast } from "@/hooks/use-toast"

export interface BulkAction {
  key: string
  label: string
  icon?: React.ReactNode
  variant?: "default" | "destructive"
  onClick: (selectedIds: string[]) => void
}

interface BulkActionsProps<T> {
  data: T[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  actions: BulkAction[]
  getItemId: (item: T) => string
  className?: string
}

export function BulkActions<T>({
  data,
  selectedIds,
  onSelectionChange,
  actions,
  getItemId,
  className
}: BulkActionsProps<T>) {
  const [isSelectAll, setIsSelectAll] = useState(false)

  const allIds = data.map(getItemId)
  const selectedCount = selectedIds.length
  const isIndeterminate = selectedCount > 0 && selectedCount < allIds.length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(allIds)
      setIsSelectAll(true)
    } else {
      onSelectionChange([])
      setIsSelectAll(false)
    }
  }

  const handleAction = (action: BulkAction) => {
    if (selectedIds.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to perform this action.",
        variant: "destructive"
      })
      return
    }

    action.onClick(selectedIds)
    
    // Clear selection after action
    onSelectionChange([])
    setIsSelectAll(false)
  }

  if (data.length === 0) return null

  return (
    <div className={`flex items-center gap-4 p-4 bg-muted/50 rounded-lg ${className}`}>
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={isSelectAll}
          onCheckedChange={handleSelectAll}
        />
        <span className="text-sm font-medium">
          {selectedCount > 0 ? (
            <Badge variant="secondary">
              {selectedCount} selected
            </Badge>
          ) : (
            "Select all"
          )}
        </span>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          {actions.slice(0, 2).map((action) => (
            action.variant === "destructive" ? (
              <ConfirmationDialog
                key={action.key}
                title={`${action.label} ${selectedCount} items?`}
                description={`This action cannot be undone. Are you sure you want to ${action.label.toLowerCase()} the selected items?`}
                confirmText={action.label}
                variant="destructive"
                onConfirm={() => handleAction(action)}
              >
                <Button variant="destructive" size="sm">
                  {action.icon}
                  {action.label}
                </Button>
              </ConfirmationDialog>
            ) : (
              <Button
                key={action.key}
                variant="outline"
                size="sm"
                onClick={() => handleAction(action)}
              >
                {action.icon}
                {action.label}
              </Button>
            )
          ))}

          {actions.length > 2 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {actions.slice(2).map((action) => (
                  <DropdownMenuItem
                    key={action.key}
                    onClick={() => handleAction(action)}
                    className={action.variant === "destructive" ? "text-destructive" : ""}
                  >
                    {action.icon}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  )
}