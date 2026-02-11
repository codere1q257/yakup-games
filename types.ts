export interface GameConfig {
  id: string;
  title: string;
  category: string;
  image: string;
  isHot?: boolean;
  isNew?: boolean;
  isBeta?: boolean; // For the Avatar feature
  component?: React.ReactNode;
}

export type GameState = 'MENU' | 'PLAYING' | 'AVATAR_CREATION';
