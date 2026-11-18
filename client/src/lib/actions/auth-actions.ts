"use server";

import { success } from "better-auth";
import { auth } from "../auth";
import { headers } from "next/headers";

interface SignUpProps { name: string, email: string, password: string, image?: string }
interface SignInProps { email: string, password: string }


export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}


export const signUp = async ({ name, email, password, image }: SignUpProps) => {

    try {
        const response = await auth.api.signUpEmail({
            body: {
                name, email, password, image, callbackURL: "/"
            }
        })

        return {
            success: true,
            data: response
        };
    }

    catch (err) {

        console.error("Sign-up error: ", err);

        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Failed to create an account."
        }
    }
}

export const signIn = async ({ email, password }: SignInProps) => {
    try {

        const response = await auth.api.signInEmail({
            body: { email, password, rememberMe: true, callbackURL: "/" }
        })

        return {
            success: true,
            message: "You have successfully signed in.",
            user: response.user
        }

    }

    catch (err) {
        console.error("Sign-in error: ", err);
        return {
            success: false,
            message: err instanceof Error
                ? err.message
                : "Invalid email or password. Please try again.",
            user: null
        }
    }
}

export const signInSocial = async (provider: "github" | "google") => {

    try {

        const { url } = await auth.api.signInSocial({
            body: { provider, callbackURL: "/" }
        })

        if (!url) {
            return {
                success: false,
                message: `Unable to initialize ${provider} sign-in. Please try again.`
            }
        }

        return {
            success: true,
            url
        }

    }

    catch (err) {

        console.error("Social signing error: ", err);

        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };

    }

}

export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });

        return { success: true };
    } catch (error) {
        console.error("Sign out error:", error);

        return {
            success: false,
            message: error instanceof Error ? error.message : "Logout failed",
        };
    }
};

export const updateUser = async ({ name }: { name: string }) => {

    try {
        const requestHeaders = await headers();

        const session = await auth.api.getSession({
            headers: requestHeaders,
        })

        if (!session) {
            return {
                success: false,
                message: "You have to log in first."
            }
        }

        const trimmedName = name.trim();

        if (!trimmedName) {
            return {
                success: false,
                message: "Name cannot be empty."
            }
        }

        if (trimmedName.length > 100) {
            return {
                success: false,
                message: "The name can be up to 50 characters long.",
            };
        }

        await auth.api.updateUser({
            headers: requestHeaders,
            body: {
                name: trimmedName,
            },
        });

        return {
            success: true,
            message: "Profile has been successfully updated.",
        };

    }

    catch (err) {

        console.error("Update user error:", err);

        return {
            success: false,
            message: "Failed to update profile.",
        };

    }

}