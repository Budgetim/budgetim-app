export const authHeader = (token: string | null) => {
  return {
    Authorization: `Bearer ${token}`,
  };
}