import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface DragDropZoneProps {
  onFilesAccepted: (files: File[]) => void
  accept?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number
  className?: string
  disabled?: boolean
}

export function DragDropZone({
  onFilesAccepted,
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    'application/pdf': ['.pdf'],
    'text/*': ['.txt', '.csv']
  },
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
  disabled = false
}: DragDropZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error: any) => {
          toast({
            title: "File rejected",
            description: `${file.name}: ${error.message}`,
            variant: "destructive"
          })
        })
      })
    }

    if (acceptedFiles.length > 0) {
      onFilesAccepted(acceptedFiles)
      toast({
        title: "Files uploaded",
        description: `${acceptedFiles.length} file(s) uploaded successfully`
      })
    }
  }, [onFilesAccepted])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
    noClick: true,
    noKeyboard: true
  })

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = acceptedFiles.filter(file => file !== fileToRemove)
    onFilesAccepted(updatedFiles)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragActive && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/5",
          !isDragActive && !isDragReject && "border-border hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        
        {isDragActive ? (
          <p className="text-lg font-medium text-primary">Drop the files here...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-medium">Drag & drop files here</p>
            <p className="text-sm text-muted-foreground">
              or{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto font-medium"
                onClick={open}
                disabled={disabled}
              >
                browse files
              </Button>
            </p>
            <p className="text-xs text-muted-foreground">
              Max {maxFiles} files, up to {Math.round(maxSize / 1024 / 1024)}MB each
            </p>
          </div>
        )}
      </div>

      {acceptedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files</h4>
          {acceptedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}