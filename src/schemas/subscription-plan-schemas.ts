export interface SubscriptionPlan {
  key: string;
  name: string;
  price: string;
  description: string;
  href?: string;
  features: string[];
  featured?: boolean;
}
