import { SignoutIcon } from "~/components/svgs";
import { Button } from "~/components/ui/button";

export function LogoutButton() {
  return (
    <Button variant="outline" className="h-8 w-8 rounded-md p-2" type="submit">
      <SignoutIcon />
    </Button>
  );
}
