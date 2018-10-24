import { Article } from './article.model';


export interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  }