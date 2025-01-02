import { useState } from 'react';
import cloudMedixLogo from '@/assets/cloudmedix.png';
import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/mode-toggle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';


const navItems = [
  { title: 'About Us', href: 'https://github.com/orgs/FIS2425/people' },
];

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/35 border-b border-background/20 backdrop-filter backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img src={cloudMedixLogo} className="h-10 w-10" alt="CloudMedix logo" />
              <span className="ml-2 text-xl font-bold text-primary">CloudMedix</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <nav className="flex">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-primary hover:bg-secondary/75 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.title}
                </Link>
              )
              )}
            </nav>
            <ModeToggle />
            <div className="ml-6">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center sm:hidden ">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col h-full">
                <nav className="flex-1 flex flex-col flex-grow space-y-8 pt-8 overflow-y-auto">
                  <Accordion type="single" collapsible className="space-y-8">
                    <AccordionItem value="value-1" className="border-none">
                      <AccordionTrigger className="text-base font-medium text-primary hover:text-primary py-0">Services</AccordionTrigger>
                      <AccordionContent className="flex flex-col pb-0">
                        <Link
                          to="/services/consulting"
                          className="text-primary/80 hover:text-primary px-3 font-medium text-base"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          Consulting
                        </Link>
                        <Link
                          to="/services/development"
                          className="text-primary/80 hover:text-primary px-3 font-medium text-base"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          Development
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="value-2" className="border-none">
                      <AccordionTrigger className="text-base font-medium text-primary hover:text-primary py-0">Products</AccordionTrigger>
                      <AccordionContent className="flex flex-col pb-0">
                        <Link
                          to="/products/a"
                          className="text-primary/80 hover:text-primary px-3 font-medium text-base"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          Product A
                        </Link>
                        <Link
                          to="/products/b"
                          className="text-primary/80 hover:text-primary px-3 font-medium text-base"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          Product B
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="text-primary hover:text-primary font-medium"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )
                  )}
                </nav>
                <end className="w-full">
                  <Separator className="w-full mb-8" />
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={() => setIsSidebarOpen(false)}>
                      Login
                    </Link>
                  </Button>
                </end>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header >
  );
}
