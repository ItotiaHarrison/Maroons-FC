import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePlayer, deletePlayer, type Player } from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditPlayerDialogProps {
  player: Player;
  onPlayerUpdated: () => void;
}

const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
const roles = ["Captain", "Coach", "Treasurer", "Member"];
const genders = ["Male", "Female"];

export function EditPlayerDialog({
  player,
  onPlayerUpdated,
}: EditPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [name, setName] = useState(player.name);
  const [position, setPosition] = useState(player.position);
  const [role, setRole] = useState(player.role || "Member");
  const [gender, setGender] = useState(player.gender || "Male");
  const [jerseyNumber, setJerseyNumber] = useState(
    player.jersey_number?.toString() || ""
  );
  const [imageUrl, setImageUrl] = useState(player.image_url || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
      await updatePlayer(player.id, {
        name,
        position,
        role,
        gender,
        jersey_number: jerseyNumber ? parseInt(jerseyNumber) : undefined,
        image_url: imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/ /g, "")}`,
      });
      toast({
        title: "Success",
        description: "Player updated successfully",
      });
      onPlayerUpdated();
      setOpen(false);
    } catch (error) {
      console.error("Error updating player:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update player. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlayer(player.id);
      toast({
        title: "Success",
        description: "Player deleted successfully",
      });
      onPlayerUpdated();
      setDeleteDialogOpen(false);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting player:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete player. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Player</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {player.name}? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Player</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
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
              <label htmlFor="position" className="text-sm font-medium">
                Position
              </label>
              <Select value={position} onValueChange={setPosition}>
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
              <label htmlFor="role" className="text-sm font-medium">
                Role *
              </label>
              <Select value={role} onValueChange={setRole}>
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
              <label htmlFor="gender" className="text-sm font-medium">
                Gender *
              </label>
              <Select value={gender} onValueChange={setGender}>
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
              <label htmlFor="jerseyNumber" className="text-sm font-medium">
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
              <label htmlFor="imageUrl" className="text-sm font-medium">
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
              {loading ? "Updating..." : "Update Player"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
