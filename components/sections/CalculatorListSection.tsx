"use client";

import Link from 'next/link';
import { categories } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CalculatorListSection() {
  return (
    <section className="py-12 bg-dot-primary/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12">
          {categories.map((category, categoryIndex) => (
            <div 
              key={category.title} 
              className="animate-in fade-in-50 duration-500"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-6 group">
                {(() => {
                  const Icon = Icons[category.iconName as keyof typeof Icons];
                  return Icon && (
                    <div className="relative">
                      <Icon className="h-6 w-6 text-primary relative z-10" />
                      <div className="absolute inset-0 bg-primary/20 blur-lg transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })()}
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
                  {category.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.items.map((item, index) => {
                  const Icon = Icons[item.iconName as keyof typeof Icons];
                  return (
                    <Link 
                      key={item.url} 
                      href={`/jsq/${item.url}`}
                      className="transform perspective-1000"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Card className={cn(
                        "p-4 hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-primary/10",
                        "cursor-pointer hover:-translate-y-1 hover:scale-[1.02] group",
                        "relative overflow-hidden"
                      )}>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-start gap-3">
                          {Icon && (
                            <div className="relative">
                              <Icon className="h-5 w-5 text-primary mt-1 group-hover:scale-110 transition-transform" />
                              <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}