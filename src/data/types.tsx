// API ANSWER USER

export type ApiAnswerLogin = {
  username?: string;
  password?: string;
  ttl?: number;
  jwt_token?: string;
  error?: boolean;
};

export type ApiAnswerSignUp = {
  signedup?: boolean;
  message?: {
    username: string[];
  };
  user?: User;
};

export type ApiAnswerProfile = {
  avatar_url?: string;
  email?: string;
};

export type ApiAnswerUser = ApiAnswerLogin & ApiAnswerSignUp & ApiAnswerProfile;

// API ANSWER POSTS

export type ApiAnswerPosts = Post[] & { message?: string; post: Post };

// API ANSWER FOLLOWS

export type ApiAnswerGetFollows = User[];
export type ApiAnswerEditFollows = { message?: string };

// USER

export type User = {
  username: string;
  email?: string;
  id?: number;
  password?: string;
  ttl?: number;
  avatar_url?: string;
};

export type ApiUserArgs = {
  url: string;
  user?: User;
};

// POST

export type Post = {
  user: {
    avatar_url: string;
    username: string;
  };
  created_at: string;
  id: number;
  content: string;
  likes: User[];
};

export type ApiPostsArgs = {
  url: string;
  post?: {
    content?: string;
    date?: string;
    id?: string;
    post_id?: string;
  };
};

// FOLLOWS

export type ApiFollowsArgs = {
  url: string;
  follows?: {
    leader_id: string;
  };
};

// OTHERS

export type ManagerData = {
  add: string;
  from: Date;
  till: Date;
};
