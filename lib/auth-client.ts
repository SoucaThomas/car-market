import { createAuthClient } from 'better-auth/react';
import { usernameClient } from 'better-auth/client/plugins';
import { toast } from 'sonner';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [usernameClient()],
  onError: () => {
    toast.error('something went wrong');
    console.log('something went wrong');
  },
});

export const { useSession, signOut } = authClient;
