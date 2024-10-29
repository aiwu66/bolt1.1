import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { vehicleTypes } from '../constants';
import { Car, Zap } from 'lucide-react';

interface VehicleTypeCardProps {
  type: typeof vehicleTypes[0];
  isSelected: boolean;
  onClick: () => void;
}

export default function VehicleTypeCard({ type, isSelected, onClick }: VehicleTypeCardProps) {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer hover:shadow-md transition-all duration-300 group relative",
        isSelected && "border-primary",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-lg p-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              {type.isNewEnergy ? <Zap className="h-4 w-4" /> : <Car className="h-4 w-4" />}
            </div>
            <h3 className="font-medium group-hover:text-primary transition-colors">
              {type.label}
            </h3>
          </div>
          {type.isNewEnergy && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              免税
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {type.description}
        </p>
        <div className="text-sm font-medium text-primary">
          参考价格：{type.price}
        </div>
      </div>
    </Card>
  );
}