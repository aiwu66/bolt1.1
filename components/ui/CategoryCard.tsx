"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import * as Icons from 'lucide-react';
import { CategoryType } from '@/lib/constants';

interface CategoryCardProps {
  category: CategoryType;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = Icons[category.iconName as keyof typeof Icons];

  return (
    <Link href={category.href}>
      <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-4">
            {Icon && <Icon className="h-6 w-6 text-primary" />}
            <div>
              <CardTitle className="text-xl">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}