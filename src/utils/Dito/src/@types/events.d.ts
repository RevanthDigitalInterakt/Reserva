type DitoEvent = {
  action: string;
  created_at?: string;
  revenue?: number;
  data?: {
    [key: string]: string
  }
};

type TrackUserRequest = {
  id: string;
  event: DitoEvent;
};

type TrackUserResponse = {
  data: Array<any>;
};
