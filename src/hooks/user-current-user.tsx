import { GetById } from "../services/user.service";
import LocalStorageKeys from "../constants/local-storage-keys";
import { useState, useEffect } from "react";
import { IUser } from "../types/user";

export default function useCurrentUser() {
  const userID = localStorage.getItem(LocalStorageKeys.USER_ID);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userID) {
        try {
          const res: any = await GetById(userID);
          setUser(res.user);
        } catch (err) {
          setError("Failed to fetch user");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userID]); // Dependency array ensures it runs when userID changes

  return { user, loading, error };
}