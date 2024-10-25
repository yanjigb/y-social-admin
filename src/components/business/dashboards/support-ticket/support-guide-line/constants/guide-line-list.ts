import { TriangleAlert, MessageSquareText, Clock4, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface IGuideLines {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  rules: string[];
}

export const guidelines: IGuideLines[] = [
  {
    icon: TriangleAlert,
    title: 'Before Submitting',
    rules: [
      'Check our FAQ section for common solutions',
      'Gather all relevant information about your issue',
      'Be ready to provide system/order details if needed',
      'Take screenshots if applicable'
    ]
  },
  {
    icon: MessageSquareText,
    title: 'Writing Your Message',
    rules: [
      'Clearly describe your issue or question',
      'Include relevant details and context',
      'Use proper language and be respectful',
      'One issue per chat session'
    ]
  },
  {
    icon: Clock4,
    title: 'Response Times',
    rules: [
      'Standard response time: 1-2 hours',
      'Priority issues: 30 minutes',
      'Weekend support: Limited availability',
      'Holiday hours may vary'
    ]
  }
];
