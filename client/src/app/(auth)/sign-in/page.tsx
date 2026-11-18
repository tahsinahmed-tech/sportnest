"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signInSocial } from "@/lib/actions/auth-actions";
import { error } from "console";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoFootballOutline } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { toast } from "sonner";


const SignInPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        error: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }


    const handleSocialAuth = async (provider: "google" | "github") => {
        setIsLoading(true);
        handleChange("error", "");

        try {
            const { success, url } = await signInSocial(provider);

            if (!success || !url) {
                throw new Error(`Unable to sign in with ${provider}. Please try again.`)
            }

            window.location.assign(url);
            toast.success("Signed in successfully!");
        } catch (err) {
            handleChange("error", `Authentication error: ${err instanceof Error ? err.message : "Unknown error"}`,
            );
            toast.error("Sign in failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleChange("error", "");
        setIsLoading(true);

        try {
            const { email, password } = formData;
            const res = await signIn({ email, password });

            if (!res?.user) {
                handleChange("error", "Invalid email or password");
                return;
            }

            toast.success("Signed in successfully!");
            router.replace("/");
            router.refresh();

        } catch (err) {

            handleChange("error", `Authentication error: ${err instanceof Error ? err.message : "Unknown error"}`);
            toast.error("Sign in failed.");

        } finally {
            setIsLoading(false);
        }
    };

    const {email, password, error} = formData;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
            <section className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50">
                {/* Top Green Gradient Banner */}
                <header className="bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#0d9458] px-6 py-8 text-center text-white">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs">
                        <IoFootballOutline className="text-2xl text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="mt-1 text-xs text-emerald-50/90">
                        Sign in to your SportNest account
                    </p>
                </header>

                {/* Form Body */}
                <div className="p-6 sm:p-7">
                    {error && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600"
                        >
                            <MdOutlineError aria-hidden="true" className="shrink-0 text-base" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="flex w-full flex-col gap-4">
                        {/* Email Address */}
                        <div className="flex w-full flex-col gap-1.5">
                            <Label
                                htmlFor="email"
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
                            >
                                EMAIL ADDRESS
                            </Label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@email.com"
                                    value={email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="h-10 w-full rounded-lg border-slate-200 pl-9 text-sm placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex w-full flex-col gap-1.5">
                            <Label
                                htmlFor="password"
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
                            >
                                PASSWORD
                            </Label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Your password"
                                    value={password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    autoComplete="current-password"
                                    minLength={8}
                                    required
                                    className="h-10 w-full rounded-lg border-slate-200 pr-9 pl-9 text-sm placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="mt-1 h-10 w-full rounded-lg bg-[#16a34a] text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center text-[11px]">
                            <span className="bg-white px-3 text-slate-400">
                                or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Auth Button */}
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => handleSocialAuth("google")}
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <FcGoogle className="text-base" />
                        <span>Continue with Google</span>
                    </Button>

                    {/* Footer Switch Link */}
                    <p className="mt-6 text-center text-xs text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-[#16a34a] hover:underline"
                        >
                            Register free
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SignInPage;