import { UserRole } from './enums/userRole';
import { UserStatus } from './enums/userStatus';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string | null;
  isEmailVerified: boolean;
  avatarUrl: string;
}

export const USERS = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: UserRole.Admin,
    status: UserStatus.Active,
    createdAt: '2024-01-15T08:30:00Z',
    lastLogin: '2024-06-01T12:15:00Z',
    isEmailVerified: true,
    avatarUrl: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: UserRole.Customer,
    status: UserStatus.Banned,
    createdAt: '2023-11-10T14:45:00Z',
    lastLogin: null,
    isEmailVerified: false,
    avatarUrl: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    name: 'Sarah Lee',
    email: 'sarah@example.com',
    role: UserRole.Manager,
    status: UserStatus.Inactive,
    createdAt: '2024-03-01T09:00:00Z',
    lastLogin: '2024-06-10T18:40:00Z',
    isEmailVerified: true,
    avatarUrl: 'https://i.pravatar.cc/100?img=3',
  },
];
