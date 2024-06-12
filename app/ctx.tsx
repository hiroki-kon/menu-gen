import React, { useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import {
  makeRedirectUri,
  useAuthRequest,
  AccessTokenRequest,
  exchangeCodeAsync,
} from "expo-auth-session";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  signIn: (path: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
};

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [signInPath, setSignInPath] = useState<string>();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID!!,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "your.app",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(code);

      (async (code) => {
        console.log(CLIENT_ID);
        try {
          const accessToken = new AccessTokenRequest({
            code,
            clientId: CLIENT_ID!!,
            clientSecret: CLIENT_SECRET!!,
            redirectUri: makeRedirectUri({
              scheme: "your.app",
            }),
            scopes: ["profile", "email"],
            extraParams: {
              code_verifier: request?.codeVerifier ? request.codeVerifier : "",
            },
          });

          const codeRes = await exchangeCodeAsync(accessToken, discovery);

          console.log(codeRes.accessToken);
          setSession(codeRes.accessToken);
          if (signInPath !== undefined) {
            router.replace(signInPath);
          }
        } catch (e) {
          console.log(e);
        }
      })(code);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (path) => {
          promptAsync();
          setSignInPath(path);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
