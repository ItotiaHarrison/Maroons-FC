import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPlayer } from "@/lib/api";
import { UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddPlayerDialogProps {
  onPlayerAdded: () => void;
}

const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

export function AddPlayerDialog({ onPlayerAdded }: AddPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setPosition(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);
    try {
      await addPlayer({
        name,
        position,
        image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/ /g, "")}`,
      });
      toast({
        title: "Success",
        description: "Player added successfully",
      });
      onPlayerAdded();
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding player:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add player. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button className="px-4 py-2">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Player
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Player Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter player name"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="position"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Position
            </label>
            <Select value={position} onValueChange={setPosition} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Player"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
