import { CategoryType } from '@/lib/constants';
import CategoryCard from '@/components/ui/CategoryCard';

interface CategoriesSectionProps {
  categories: CategoryType[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">功能分类</h2>
          <p className="text-muted-foreground">
            多样化的计算工具，满足您的各种需求
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}