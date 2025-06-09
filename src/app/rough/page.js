"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function RoughPage() {
  return (
    <AuroraBackground>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">AuroraBackground Demo</h1>
        <p className="text-xl mb-8">This is a rough test page to preview the Aurora effect on a #18181B background.</p>
        <button className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 transition">Click Me</button>
      </div>
    </AuroraBackground>
  );
}
