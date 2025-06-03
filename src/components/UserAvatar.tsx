import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name: string;
    email: string;
    picture?: string | null;
  };
  size?: number;
  className?: string;
}

export const UserAvatar = ({ user, size = 40, className }: UserAvatarProps) => {
  // Generate Dicebear Notionists avatar URL using user's email as seed
  const avatarUrl =
    user.picture ||
    `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
      user.email
    )}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <Image
      src={avatarUrl}
      alt={`${user.name} avatar`}
      width={size}
      height={size}
      className={cn("rounded-full", className)}
    />
  );
};
