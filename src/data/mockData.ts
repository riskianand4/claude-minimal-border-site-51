// Mock data for the application
export interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  avatar?: string
  createdAt: string
  lastLogin?: string
  department: string
}

export interface LibraryItem {
  id: string
  title: string
  type: 'document' | 'image' | 'video' | 'audio'
  size: number
  uploadedBy: string
  uploadedAt: string
  tags: string[]
  description?: string
  url: string
  preview?: string
}

export interface Asset {
  id: string
  name: string
  type: string
  category: string
  status: 'active' | 'inactive' | 'pending'
  value: number
  assignedTo?: string
  location: string
  purchaseDate: string
  lastMaintenance?: string
}

// Generate mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20',
    department: 'IT'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'active',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-19',
    department: 'Sales'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-15',
    department: 'Marketing'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-20',
    department: 'HR'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Manager',
    status: 'active',
    createdAt: '2024-01-12',
    lastLogin: '2024-01-18',
    department: 'Finance'
  }
]

// Generate mock library items
export const mockLibraryItems: LibraryItem[] = [
  {
    id: '1',
    title: 'Project Documentation',
    type: 'document',
    size: 2048000,
    uploadedBy: 'John Doe',
    uploadedAt: '2024-01-15',
    tags: ['documentation', 'project'],
    description: 'Comprehensive project documentation',
    url: '/documents/project-docs.pdf'
  },
  {
    id: '2',
    title: 'Company Logo',
    type: 'image',
    size: 512000,
    uploadedBy: 'Jane Smith',
    uploadedAt: '2024-01-14',
    tags: ['logo', 'branding'],
    description: 'Official company logo in high resolution',
    url: '/images/logo.png'
  },
  {
    id: '3',
    title: 'Training Video',
    type: 'video',
    size: 50000000,
    uploadedBy: 'Bob Johnson',
    uploadedAt: '2024-01-13',
    tags: ['training', 'education'],
    description: 'Employee training video for new hires',
    url: '/videos/training.mp4'
  },
  {
    id: '4',
    title: 'Meeting Recording',
    type: 'audio',
    size: 10000000,
    uploadedBy: 'Alice Brown',
    uploadedAt: '2024-01-12',
    tags: ['meeting', 'recording'],
    description: 'Important meeting audio recording',
    url: '/audio/meeting.mp3'
  },
  {
    id: '5',
    title: 'Marketing Materials',
    type: 'document',
    size: 3000000,
    uploadedBy: 'Charlie Wilson',
    uploadedAt: '2024-01-11',
    tags: ['marketing', 'materials'],
    description: 'Marketing campaign materials and guidelines',
    url: '/documents/marketing.pdf'
  }
]

// Generate mock assets
export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Dell Laptop XPS 13',
    type: 'Laptop',
    category: 'IT Equipment',
    status: 'active',
    value: 1200,
    assignedTo: 'John Doe',
    location: 'Office A',
    purchaseDate: '2023-06-15',
    lastMaintenance: '2024-01-10'
  },
  {
    id: '2',
    name: 'Conference Room Table',
    type: 'Furniture',
    category: 'Office Furniture',
    status: 'active',
    value: 800,
    location: 'Conference Room 1',
    purchaseDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'HP Printer Pro',
    type: 'Printer',
    category: 'IT Equipment',
    status: 'pending',
    value: 400,
    location: 'Office B',
    purchaseDate: '2023-08-10',
    lastMaintenance: '2023-12-15'
  },
  {
    id: '4',
    name: 'Security Camera System',
    type: 'Security',
    category: 'Security Equipment',
    status: 'active',
    value: 2000,
    location: 'Building Perimeter',
    purchaseDate: '2023-01-25',
    lastMaintenance: '2024-01-05'
  },
  {
    id: '5',
    name: 'Office Chair Ergonomic',
    type: 'Chair',
    category: 'Office Furniture',
    status: 'inactive',
    value: 300,
    assignedTo: 'Jane Smith',
    location: 'Office C',
    purchaseDate: '2023-05-12'
  }
]

// Dashboard statistics
export const dashboardStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.status === 'active').length,
  totalAssets: mockAssets.length,
  totalLibraryItems: mockLibraryItems.length,
  monthlyGrowth: 12,
  storageUsed: 75.5,
  systemHealth: 98.5
}

// Activity log
export const activityLog = [
  {
    id: '1',
    user: 'John Doe',
    action: 'uploaded new document',
    item: 'Project Documentation',
    timestamp: '2024-01-20T10:30:00Z',
    type: 'upload'
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'added new user',
    item: 'Charlie Wilson',
    timestamp: '2024-01-20T09:15:00Z',
    type: 'user'
  },
  {
    id: '3',
    user: 'System',
    action: 'performed maintenance',
    item: 'Security Camera System',
    timestamp: '2024-01-20T08:00:00Z',
    type: 'maintenance'
  },
  {
    id: '4',
    user: 'Bob Johnson',
    action: 'updated asset status',
    item: 'HP Printer Pro',
    timestamp: '2024-01-19T16:45:00Z',
    type: 'update'
  },
  {
    id: '5',
    user: 'Alice Brown',
    action: 'exported report',
    item: 'Monthly Assets Report',
    timestamp: '2024-01-19T14:20:00Z',
    type: 'export'
  }
]