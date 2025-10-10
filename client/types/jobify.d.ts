declare namespace Express {
  interface Request {
    user: { userId: string; role: string; testUser: boolean };
  }
}

type LoginRequest = {
  email: string;
  password: string;
};

type JobModel = {
  _id: string;
  company: string;
  position: string;
  jobStatus: JOB_STATUS;
  jobType: JOB_TYPE;
  jobLocation: string;
  createdAt: string;
  createdBy: object;
};

type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
};

type SearchParams = {
  search: string;
  jobStatus: string;
  jobType: string;
  sort: string;
  page: number;
};

type UserModel = {
  _id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role?: string;
  avatar?: string;
};
