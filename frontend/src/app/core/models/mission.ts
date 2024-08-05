export class Mission {
  id!: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: MissionStatus;
  userId!: string[];
  client?: string;
  clientFirstName?: string;
  clientLastName?: string;
  usersInfo?: any[];
}

enum MissionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
