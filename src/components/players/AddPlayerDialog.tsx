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
const roles = ["Captain", "Coach", "Treasurer", "Member"];
const genders = ["Male", "Female"];

export function AddPlayerDialog({ onPlayerAdded }: AddPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState<string>();
  const [role, setRole] = useState<string>("Member");
  const [gender, setGender] = useState<string>("Male");
  const [jerseyNumber, setJerseyNumber] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setPosition(undefined);
    setRole("Member");
    setGender("Male");
    setJerseyNumber("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position || !role || !gender) {
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
        role,
        gender,
        jersey_number: jerseyNumber ? parseInt(jerseyNumber) : undefined,
        image_url: imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/ /g, "")}`,
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
              Player Name *
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
              Position *
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

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium leading-none">
              Role *
            </label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium leading-none">
              Gender *
            </label>
            <Select value={gender} onValueChange={setGender} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="jerseyNumber" className="text-sm font-medium leading-none">
              Jersey Number
            </label>
            <Input
              id="jerseyNumber"
              type="number"
              value={jerseyNumber}
              onChange={(e) => setJerseyNumber(e.target.value)}
              placeholder="Enter jersey number"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm font-medium leading-none">
              Image URL
            </label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full"
            />
          </div>


          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Player"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
