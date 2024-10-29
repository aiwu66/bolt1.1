import HeroSection from '@/components/sections/HeroSection';
import CalculatorListSection from '@/components/sections/CalculatorListSection';

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CalculatorListSection />
    </main>
  );
}