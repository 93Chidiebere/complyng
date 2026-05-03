import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserType = "business" | "practitioner" | "consultant" | "investor";

export type User = {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  organization?: string;
  profileComplete: boolean;
  createdAt: string;
};

type StoredUser = User & { password: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: (userType?: UserType) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    userType: UserType;
    organization?: string;
  }) => Promise<{ error?: string }>;
  logout: () => void;
  completeProfile: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "complyng_users";
const SESSION_KEY = "complyng_session";

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};
const writeUsers = (users: StoredUser[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

const stripPassword = (u: StoredUser): User => {
  const { password, ...rest } = u;
  return rest;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const sessionId = localStorage.getItem(SESSION_KEY);
      if (sessionId) {
        const found = readUsers().find((u) => u.id === sessionId);
        if (found) setUser(stripPassword(found));
      }
    } catch {}
    setLoading(false);
  }, []);

  const persistSession = (u: User) => {
    localStorage.setItem(SESSION_KEY, u.id);
    setUser(u);
  };

  const login: AuthContextType["login"] = async (email, password) => {
    const found = readUsers().find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );
    if (!found) return { error: "No account found with that email." };
    if (found.password !== password) return { error: "Incorrect password." };
    persistSession(stripPassword(found));
    return {};
  };

  const register: AuthContextType["register"] = async (data) => {
    const email = data.email.toLowerCase().trim();
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return { error: "An account with this email already exists." };
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email,
      password: data.password,
      fullName: data.fullName,
      userType: data.userType,
      organization: data.organization,
      profileComplete: false,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    persistSession(stripPassword(newUser));
    return {};
  };

  const loginWithGoogle: AuthContextType["loginWithGoogle"] = async (
    userType = "business"
  ) => {
    const users = readUsers();
    const email = "google.user@complyng.demo";
    let existing = users.find((u) => u.email === email);
    if (!existing) {
      existing = {
        id: crypto.randomUUID(),
        email,
        password: "__google__",
        fullName: "Google Demo User",
        userType,
        profileComplete: false,
        createdAt: new Date().toISOString(),
      };
      users.push(existing);
      writeUsers(users);
    }
    persistSession(stripPassword(existing));
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateUser: AuthContextType["updateUser"] = (updates) => {
    if (!user) return;
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...updates };
    writeUsers(users);
    setUser(stripPassword(users[idx]));
  };

  const completeProfile = () => updateUser({ profileComplete: true });

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginWithGoogle, register, logout, completeProfile, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
