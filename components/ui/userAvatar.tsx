import { User } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import clsx from "clsx";

interface UserAvatarProps {
  user: User;
  size?: number;
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  return (
    <Avatar
      className={clsx(
        "rounded-full",
        size ? `h-${size} w-${size}` : "h-12 w-12"
      )}
    >
      <AvatarImage src={user.image || ""} alt={user.name} />
      <AvatarFallback className="rounded-lg">
        {user.name.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
