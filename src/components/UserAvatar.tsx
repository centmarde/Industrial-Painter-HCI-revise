import { Avatar } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useUserStore } from "../stores/UserStore";
import { useEffect } from "react";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
  };
}

interface UserAvatarProps {
  size?: number;
  additionalSx?: React.CSSProperties;
}

export default function UserAvatar({ size = 40, additionalSx = {} }: UserAvatarProps) {
  const { user, firestoreUserData, fetchFirestoreUserData } = useUserStore();

  // Fetch Firestore data when component mounts if we have a user but no data
  useEffect(() => {
    if (user && !firestoreUserData) {
      fetchFirestoreUserData(user.uid);
    }
  }, [user, firestoreUserData, fetchFirestoreUserData]);

  if (!user) {
    return <AccountCircle sx={{ width: size, height: size, ...additionalSx }} />;
  }

  // Prioritize Firestore photoURL if available
  const photoURL = firestoreUserData?.photoURL || user.photoURL;
  const displayName = firestoreUserData?.displayName || user.displayName;

  if (photoURL) {
    return (
      <Avatar 
        src={photoURL} 
        alt={displayName || 'User'} 
        sx={{ 
          width: size, 
          height: size, 
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          ...additionalSx
        }}
      />
    );
  }

  if (displayName) {
    const avatarProps = stringAvatar(displayName);
    return (
      <Avatar 
        {...avatarProps} 
        sx={{ 
          ...avatarProps.sx, 
          width: size, 
          height: size, 
          ...additionalSx 
        }} 
      />
    );
  }

  return <AccountCircle sx={{ width: size, height: size, ...additionalSx }} />;
}
