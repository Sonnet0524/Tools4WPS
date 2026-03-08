export interface User {
  id: string;
  user_name: string;
  status: 'active' | 'notactive' | 'disabled';
  role: 'super-admin' | 'admin' | 'normal';
  phone?: string;
  email?: string;
  depts?: Department[];
  ctime?: number;
  gender?: string;
  employee_id?: string;
  title?: string;
  leader_id?: string;
  def_dept_id?: string;
}

export interface Department {
  id: string;
  name: string;
  abs_path: string;
}

export interface Group {
  id: string;
  name?: string;
  ctime: number;
}

export interface UserListResult {
  items: User[];
  next_page_token?: string;
  total?: number;
}

export interface GroupListResult {
  items: Group[];
  next_page_token?: string;
}

export interface GetUsersParams {
  status?: 'active' | 'notactive' | 'disabled' | ('active' | 'notactive' | 'disabled')[];
  pageSize?: number;
  pageToken?: string;
  withDept?: boolean;
  withTotal?: boolean;
}

export interface GetGroupsParams {
  pageSize?: number;
  pageToken?: string;
}

export interface APIError {
  code: number;
  msg: string;
}

export interface Chat {
  id: string;
  name?: string;
  type: 'p2p' | 'group';
  status: 'active' | 'inactive' | 'dismissed';
  ctime: number;
}

export interface ChatListResult {
  items: Chat[];
  next_page_token?: string;
}

export interface GetChatsParams {
  pageSize: number;
  pageToken?: string;
}

export interface MessageResult {
  message_id: string;
  chat_id: string;
  ctime: string;
  type: string;
}

export interface SendToUserParams {
  userId: string;
  content: string;
}

export interface SendToChatParams {
  chatId: string;
  content: string;
}

export interface TodoTaskTitle {
  prefix: string;
  subject: string;
}

export interface TodoTaskLink {
  pcUrl: string;
  mobileUrl: string;
}

export interface TodoNotifyConfig {
  switch: boolean;
  reminders: number[];
}

export interface TodoTask {
  taskId: string;
  executor: string;
  title: TodoTaskTitle;
  description?: string;
  dueTime?: number;
  status: 'todo' | 'finish';
  priority?: number;
  createTime?: number;
  finishTime?: number;
  creator?: string;
  link?: TodoTaskLink;
  notifyConfig?: TodoNotifyConfig;
}

export interface TodoResult {
  taskId: string;
}

export interface CreateTaskParams {
  executor: string;
  title: TodoTaskTitle;
  description?: string;
  dueTime?: number;
  priority?: number;
  link?: TodoTaskLink;
  reminders?: number[];
}

export interface UpdateTaskParams {
  taskId: string;
  status?: 'todo' | 'finish';
  description?: string;
  dueTime?: number;
  priority?: number;
  title?: TodoTaskTitle;
}
