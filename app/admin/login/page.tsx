"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err: any) {
            setError("Invalid email or password");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/logo.jpeg" alt="Logo" className="h-16 mx-auto mb-4 object-contain" />
                    <h1 className="text-2xl font-bold text-neutral-900">Admin Login</h1>
                    <p className="text-neutral-500 text-sm">Sign in to manage Dravida Thalaimurai</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-dravida-red transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-dravida-red text-white font-bold rounded-lg hover:bg-black transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-neutral-400">
                    &copy; {new Date().getFullYear()} Dravida Thalaimurai. Internal Use Only.
                </div>
            </div>
        </div>
    );
}
