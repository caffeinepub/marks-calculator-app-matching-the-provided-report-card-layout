import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, ExternalLink, FileText, Printer } from "lucide-react";

interface GoogleDriveSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadJSON: () => void;
  onDownloadPDF: () => void;
}

export function GoogleDriveSaveDialog({
  open,
  onOpenChange,
  onDownloadJSON,
  onDownloadPDF,
}: GoogleDriveSaveDialogProps) {
  const handleOpenDrive = () => {
    window.open("https://drive.google.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] print:hidden">
        <DialogHeader>
          <DialogTitle>Save to Google Drive</DialogTitle>
          <DialogDescription>
            Follow these steps to save your completed report card to Google
            Drive
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <div className="space-y-2 flex-1">
                <p className="text-sm font-medium">Download your report card</p>
                <p className="text-sm text-muted-foreground">
                  Choose to download as PDF (recommended for printing) or JSON
                  (for editing later)
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={onDownloadPDF}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    Save as PDF
                  </Button>
                  <Button
                    onClick={onDownloadJSON}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Download JSON
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  For PDF: Select "Save as PDF" as the destination in the print
                  dialog
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div className="space-y-2 flex-1">
                <p className="text-sm font-medium">Open Google Drive</p>
                <Button
                  onClick={handleOpenDrive}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Google Drive
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                3
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium">Upload the file</p>
                <p className="text-sm text-muted-foreground">
                  In Google Drive, click <strong>New</strong> →{" "}
                  <strong>File upload</strong> and select the downloaded file
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
