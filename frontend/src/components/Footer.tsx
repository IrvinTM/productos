import { Github, Twitter, Linkedin, Home, Info, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-center gap-12 items-center content-center">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-primary">Sistema de productos</h2>
            <p className="text-sm text-muted-foreground">
              Sistema para la gestión de productos en una tienda.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-primary">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-muted-foreground hover:text-primary">
                    <Home className="inline-block w-4 h-4 mr-2" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    <Info className="inline-block w-4 h-4 mr-2" />
                    About
                  </a>
                </li>
                <li>
                  <a href="/contribute" className="text-sm text-muted-foreground hover:text-primary">
                    <Users className="inline-block w-4 h-4 mr-2" />
                    Contribute
                  </a>
                </li>
                <li>
                  <a href="/docs" className="text-sm text-muted-foreground hover:text-primary">
                    <BookOpen className="inline-block w-4 h-4 mr-2" />
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Productos.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/IrvinTM" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
