interface UserInfo {
  firstName: string;
  lastName: string;
  bodySize: string;
  bodyWeight: string;
  email: string;
  password: string;
}

interface StepList {
  id: string;
  title: string;
}

interface ProfileInfo {
  goal: string;
  calories: string;
  type: string;
  allergies: string[];
  incompatibilities: string[];
  additional: string[];
}
