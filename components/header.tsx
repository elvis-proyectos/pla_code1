import Link from "next/link"
import { DiscIcon as Discord } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          HACK
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/downloads" className="text-sm font-medium hover:underline">
            Downloads
          </Link>
          <Link href="/guides" className="text-sm font-medium hover:underline">
            Troubleshooting Guides
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/discord" 
            className="flex items-center gap-2 bg-[#5865F2] text-white px-4 py-2 rounded-md hover:bg-[#4752C4] transition-colors"
          >
            <Discord className="h-5 w-5" />
            Join our Discord
          </Link>
        </div>
      </div>
    </header>
  )
}

