type User = {
  name: string;
  avatarUrl: string;
  score?: number;
  classificacao?: "Iniciante" | "Intermediário" | "Avançado";
};


const USER_KEY = "user";

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const setUserScoreClassificacao = (score: number, classificacao: "Iniciante" | "Intermediário" | "Avançado") => {
  const user = getUser();
  if (!user) return;

  const updatedUser = {
    ...user,
    score,
    classificacao,
  };

  setUser(updatedUser);
};
