import { SubscriptionPlan } from '@/schemas/subscription-plan-schemas';

const all_features = [
  'Full access to all features',
  'Connect unlimited data sources',
  'AI-powered search',
  'Email support',
  'One-on-one onboarding session'
];

export const QUANTA_QUEST_PLANS: SubscriptionPlan[] = [
  {
    key: 'monthly',
    name: 'Monthly Plan',
    price: '$12.00/month',
    description: 'Save $4.00/month with early subscription.',
    features: all_features
  },
  {
    key: 'quarterly',
    name: 'Quarterly Plan',
    price: '$11.00/month',
    description: 'Save $5/month with early subscription.',
    features: all_features,
    href: '/dashboard'
  },
  {
    key: 'yearly',
    name: 'Yearly Plan',
    price: '$10.00/month',
    description: 'Save $6/month with early subscription.',
    features: all_features,
    featured: true
  }
];
