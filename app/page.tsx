import { CodeEditor } from "@/components/code-editor"
import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="container py-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">001 - IR TURRET</h1>
          <CodeEditor />
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="space-y-4">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Video</h2>
              <div className="aspect-video bg-muted rounded-lg mt-2">
                {/* Video embed would go here */}
              </div>
            </div>
            <div className="h-[600px]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

