interface ITask {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  scheduleAt?: string | undefined;
  finishedAt?: string | undefined;
}

interface IUser {
  id: string;
  name: string;
  email: boolean;
}
