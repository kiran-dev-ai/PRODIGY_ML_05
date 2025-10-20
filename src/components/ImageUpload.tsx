import { useRef, useState } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelected: (imageData: string) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelected, isAnalyzing }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!preview ? (
        <div className="bg-gradient-card rounded-2xl p-8 shadow-soft border border-border">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-primary/10 p-6 rounded-full">
              <Camera className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Capture or Upload Food
              </h2>
              <p className="text-muted-foreground">
                Take a photo or upload an image to analyze nutritional content
              </p>
            </div>
            <div className="flex gap-4 w-full max-w-sm">
              <Button
                onClick={handleCameraClick}
                className="flex-1 bg-gradient-hero hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Camera
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-soft border border-border">
            <img
              src={preview}
              alt="Food preview"
              className="w-full h-auto max-h-96 object-cover"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                  <p className="text-foreground font-medium">Analyzing food...</p>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={() => {
              setPreview(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            variant="outline"
            className="w-full"
            disabled={isAnalyzing}
          >
            Choose Different Image
          </Button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
