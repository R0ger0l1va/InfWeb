"use client";

import React from "react";
import Image from "next/image";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Login successful!");
        setIsExiting(true);
        // Esperamos a que termine la animación (0.5s en globals.css)
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col md:flex-row bg-black text-white font-sans overflow-hidden ${
        isExiting ? "animate-slide-out-left" : ""
      }`}
    >
      {/* Left Section - Form */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-black">
        <div className="mb-12">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-orky-yellow rounded flex items-center justify-center">
              <span className="text-black font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold tracking-wider">ORKY</span>
          </div>

          <h1 className="text-4xl font-bold mb-2">Sign In</h1>
          <p className="text-gray-400">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email Address
            </Label>
            <div className="relative focus-within:text-orky-yellow transition-colors">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <User size={20} />
              </div>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter Email Address"
                className={`pl-10 h-12 bg-zinc-900 border-zinc-800 focus:border-orky-yellow focus:ring-1 focus:ring-orky-yellow text-white placeholder:text-gray-600 rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </Label>
            <div className="relative focus-within:text-orky-yellow transition-colors">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock size={20} />
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter Password"
                className={`pl-10 h-12 bg-zinc-900 border-zinc-800 focus:border-orky-yellow focus:ring-1 focus:ring-orky-yellow text-white placeholder:text-gray-600 rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-800 bg-zinc-900 checked:bg-orky-yellow accent-orky-yellow"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-400 select-none"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-orky-yellow hover:text-orky-yellow-hover transition-colors uppercase tracking-tight"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-orky-yellow hover:bg-orky-yellow-hover text-black font-bold text-base rounded-lg mt-4 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                SIGNING IN...
              </>
            ) : (
              "SIGN IN"
            )}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-white font-medium hover:text-orky-yellow transition-colors"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>

      {/* Right Section - Image & Teaser */}
      <div className="hidden md:flex flex-1 relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/login-bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent opacity-40" />

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-16 lg:px-24">
          <div className="max-w-md">
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
              A new way to experience{" "}
              <span className="text-orky-yellow">real estate</span> in the
              infinite virtual space.
            </h2>
            <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-orky-yellow transition-colors group">
              Learn More
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Decorative elements or carousel indicator (from reference image) */}
        <div className="absolute bottom-12 right-12 flex items-center gap-8">
          <div className="relative w-32 h-0.5 bg-zinc-800">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-orky-yellow" />
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center hover:border-orky-yellow transition-colors cursor-pointer">
              <span className="text-xs">&lt;</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center hover:border-orky-yellow transition-colors cursor-pointer">
              <span className="text-xs">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
