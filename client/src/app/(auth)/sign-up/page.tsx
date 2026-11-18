"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSocial, signUp } from "@/lib/actions/auth-actions";
import { Eye, EyeOff, Link2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoFootballOutline } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { toast } from "sonner";


const SignUpPage = () => {
    const router = useRouter();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
        confirmPassword: "",
        error: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

            const { name, email, password, image } = formData;
            const res = await signUp({
                name, email, password,
                ...(image.trim() ? { image: image.trim() } : {}),
            });

            console.error(res);

            if (!res?.data?.user) {
                handleChange("error", "Failed to create an account");
                return;
            }

            toast.success("Account created successfully!");
            router.replace("/");
            router.refresh();

        } catch (err) {

            handleChange("error", `Authentication error: ${err instanceof Error ? err.message : "Unknown error"}`);
            console.error(error);
            toast.error("Sign up failed.");

        } finally {
            setIsLoading(false);
        }
    };

    const { name, email, image, password, confirmPassword, error } = formData

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-12">
            <section className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50">
                {/* Top Green Gradient Banner */}
                <header className="bg-linear-to-r from-[#22c55e] via-[#16a34a] to-[#0d9458] px-6 py-8 text-center text-white">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs">
                        <IoFootballOutline className="text-2xl text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Create Account</h1>
                    <p className="mt-1 text-xs text-emerald-50/90">
                        Join SportNest for free today
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
                        {/* Full Name */}
                        <div className="flex w-full flex-col gap-1.5">
                            <Label
                                htmlFor="name"
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
                            >
                                FULL NAME
                            </Label>
                            <div className="relative">
                                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    autoComplete="name"
                                    required
                                    className="h-10 w-full rounded-lg border-slate-200 pl-9 text-sm placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                />
                            </div>
                        </div>

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

                        {/* Photo URL (Optional) */}
                        <div className="flex w-full flex-col gap-1.5">
                            <Label
                                htmlFor="image"
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
                            >
                                PHOTO URL (OPTIONAL)
                            </Label>
                            <div className="relative">
                                <Link2 className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    placeholder="https://..."
                                    value={image}
                                    onChange={(e) => handleChange("image", e.target.value)}
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
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    autoComplete="new-password"
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


                        {/* Confirm Password */}
                        <div className="flex w-full flex-col gap-1.5">
                            <Label
                                htmlFor="confirmPassword"
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
                            >
                                CONFIRM PASSWORD
                            </Label>

                            <div className="relative">
                                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="h-10 w-full rounded-lg border-slate-200 pr-9 pl-9 text-sm placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
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
                            {isLoading ? "Creating Account..." : "Create Account"}
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
                    {/* Google Auth Button */}
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => handleSocialAuth("github")}
                        className="flex mt-4 h-10 w-full items-center justify-center gap-2 rounded-lg border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <FaGithub className="text-base" />
                        <span>Continue with GitHub</span>
                    </Button>

                    {/* Footer Switch Link */}
                    <p className="mt-6 text-center text-xs text-slate-500">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-[#16a34a] hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;