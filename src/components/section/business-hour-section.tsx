import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BusinessHours } from '@/service/flyfood-api/types';
import { Clock } from 'lucide-react';

interface BusinessHoursSectionProps {
  businessHours: BusinessHours[];
}

export default function BusinessHoursSection({
  businessHours,
}: Readonly<BusinessHoursSectionProps>) {
  const daysOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Horário de funcionamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {businessHours.map((hours) => (
            <li key={hours.weekDay} className="flex justify-between">
              <span>{daysOfWeek[hours.weekDay]}</span>
              <span>{`${hours.openingTime} - ${hours.closingTime}`}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
