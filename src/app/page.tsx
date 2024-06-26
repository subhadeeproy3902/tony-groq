import GroqAI from "@/components/GroqAI";
import Image from "next/image";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div>
      <GroqAI />
      <Toaster />
    </div>
  );
}
