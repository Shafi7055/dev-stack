export interface TechnologyType {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  badge?: string;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  docsUrl?: string;
}
