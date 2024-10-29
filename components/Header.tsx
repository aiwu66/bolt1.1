"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator, Moon, Sun, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Search } from '@/components/ui/search';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavMenuLink } from '@/components/ui/NavigationMenuLink';
import { categories } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-background'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Home */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="text-base font-medium whitespace-nowrap">在线计算器</span>
            </Link>

            <Link 
              href="/" 
              className="hidden md:flex items-center space-x-1.5 text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <Home className="h-4 w-4" />
              <span>首页</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center max-w-3xl px-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {categories.map((category) => (
                  <NavigationMenuItem key={category.title}>
                    <NavigationMenuTrigger className="text-sm px-3 py-2">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <NavMenuLink
                              href={`/jsq/${item.url}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium mb-1">{item.name}</div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                              )}
                            </NavMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="relative w-64 hidden md:block">
              <Search />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
              <Search />
            </div>
            <div className="px-4 pb-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Link>
              {categories.map((category) => (
                <div key={category.title} className="mt-4">
                  <div className="px-3 mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={`/jsq/${item.url}`}
                        className="text-sm py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}