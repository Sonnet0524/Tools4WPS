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
  avatar?: string;
  company_id?: string;
  creator_id?: string;
  dept_id?: string;
  description?: string;
  member_total?: number;
  mtime?: number;
  owner_id?: string;
  source?: string;
  status?: 'enable' | 'recycled';
  type?: 'normal' | 'dept' | 'org_dynamic' | 'org_normal';
}

export interface GroupMember {
  item_id: string;
  item_type: 'normal' | 'dept';
  role: 'normal' | 'admin' | 'owner';
  about?: string;
  nickname?: string;
  group_id?: string;
  ctime?: number;
  mtime?: number;
  dept_info?: Array<{
    abs_path: string;
    id: string;
    name: string;
  }>;
  user_info?: {
    avatar?: string;
    depts?: Array<{
      abs_path: string;
      id: string;
      id_path?: string;
      name: string;
      parent_id?: string;
    }>;
    company_id?: string;
    id: string;
    status?: string;
    user_name: string;
  };
}

export interface UserListResult {
  items: User[];
  next_page_token?: string;
  total?: number;
}

export interface GroupListResult {
  items: Group[];
  next_page_token?: string;
  total?: number;
}

export interface GroupMemberListResult {
  items: GroupMember[];
  next_page_token?: string;
  total?: number;
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
  deptIds?: string[];
  excludeDeptIds?: string[];
  joined?: boolean;
  source?: string[];
  status?: ('enable' | 'recycled')[];
  type?: ('normal' | 'dept' | 'org_dynamic' | 'org_normal')[];
  userId?: string;
  userRole?: string[];
  withTotal?: boolean;
}

export interface GetGroupMembersParams {
  groupId: string;
  pageSize?: number;
  pageToken?: string;
  roles?: ('normal' | 'admin' | 'owner')[];
  withDeptInfo?: boolean;
  withTotal?: boolean;
  withUserInfo?: boolean;
}

export interface CreateGroupParams {
  creatorId: string;
  name: string;
  deptId?: string;
  description?: string;
  ownerId?: string;
  source?: string;
  type?: 'normal' | 'dept' | 'org_dynamic' | 'org_normal';
  visibilityType?: 'nobody' | 'all' | 'group' | 'specify';
  visibilityMembers?: Array<{
    item_ids: string[];
    item_type: 'normal' | 'dept';
  }>;
}

export interface AddGroupMemberParams {
  groupId: string;
  itemId: string;
  itemType?: 'normal' | 'dept';
  role?: 'normal' | 'admin' | 'owner';
  nickname?: string;
  about?: string;
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

// ============ 多维表格 (DBSheet) 类型 ============

export interface DBSheetField {
  id: string;
  name: string;
  type: string;
  data?: Record<string, unknown>;
}

export interface DBSheetView {
  id: string;
  name: string;
  type: string;
}

export interface DBSheet {
  id: number;
  name: string;
  primary_field_id: string;
  fields: DBSheetField[];
  views: DBSheetView[];
}

export interface DBSheetSchema {
  sheets: DBSheet[];
}

export interface DBSheetRecord {
  id: string;
  fields: Record<string, unknown>;
  created_time?: string;
  creator?: string;
  last_modified_time?: string;
  last_modified_by?: string;
}

export interface DBSheetRecordResult {
  records: DBSheetRecord[];
  page_token?: string;
  fields_schema?: DBSheetField[];
}

export interface ListRecordsParams {
  fileId: string;
  sheetId: number;
  fields?: string[];
  filter?: {
    criteria: Array<{
      field?: string;
      operator?: string;
      value?: unknown;
    }>;
  };
  maxRecords?: number;
  pageSize?: number;
  pageToken?: string;
  preferId?: boolean;
  showFieldsInfo?: boolean;
  showRecordExtraInfo?: boolean;
  textValue?: 'original' | 'text' | 'compound';
  viewId?: string;
}

export interface CreateRecordParams {
  fileId: string;
  sheetId: number;
  preferId?: boolean;
  records: Array<{
    fieldsValue: Record<string, unknown>;
  }>;
}

export interface CreateSheetParams {
  fileId: string;
  name?: string;
  fields: Array<{
    name: string;
    type: string;
    data?: Record<string, unknown>;
  }>;
  views: Array<{
    name: string;
    type: string;
  }>;
}

// ============ 云文档 (Document) 类型 ============

export type DocumentType = 'docx' | 'xlsx' | 'pptx' | 'pdf';

export interface CreateDocumentParams {
  name: string;
  type: DocumentType;
  folderId?: string;
  content?: string;
  templateId?: string;
}

export interface CreateDocumentResult {
  fileId: string;
  fileName: string;
  type: DocumentType;
  ctime: number;
  url: string;
}

export interface DocumentInfo {
  fileId: string;
  fileName: string;
  type: DocumentType;
  size: number;
  ctime: number;
  mtime: number;
  creator: string;
  modifier: string;
  url: string;
  parentId?: string;
}

export interface ShareLinkParams {
  fileId: string;
  expireTime?: number;
  permission?: 'read' | 'write' | 'comment';
  password?: string;
}

export interface ShareLinkResult {
  shareId: string;
  shareUrl: string;
  expireTime?: number;
  permission: string;
}

export interface SaveDocumentParams {
  fileId: string;
  content: string;
  format?: 'html' | 'text' | 'markdown';
}

export interface FolderInfo {
  folderId: string;
  name: string;
  parentId?: string;
  ctime: number;
}

export interface CreateFolderParams {
  name: string;
  parentId?: string;
}

export interface ListFilesParams {
  folderId?: string;
  pageSize?: number;
  pageToken?: string;
  type?: DocumentType | DocumentType[];
}

export interface ListFilesResult {
  files: DocumentInfo[];
  folders: FolderInfo[];
  nextPageToken?: string;
}

// ============ 日历 (Calendar) 类型 ============

export interface Calendar {
  id: string;
  summary: string;
  type: 'primary' | 'normal';
  role: 'free_busy_reader' | 'reader' | 'writer' | 'owner';
  description?: string;
  is_deleted?: boolean;
  open_status?: 'private' | 'show_only_free_busy' | 'public';
}

export interface CalendarEventTime {
  date?: string; // yyyy-mm-dd 全天日程
  datetime?: string; // RFC3339 非全天
}

export interface CalendarEventRecurrence {
  freq?: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY';
  interval?: number;
  count?: number;
  until_date?: CalendarEventTime;
  by_day?: string[];
  by_month?: number[];
  by_month_day?: number[];
  exdate?: CalendarEventTime[];
}

export interface CalendarEventReminder {
  minutes: number;
}

export interface CalendarEventLocation {
  name: string;
}

export interface CalendarEventOrganizer {
  type: 'user';
  user_id: string;
}

export interface CalendarEventOnlineMeeting {
  description?: string;
  provider: string;
  url?: string;
  join_code?: string;
  meeting_setting?: {
    auto_recording?: string;
    host_id?: string;
    is_allow_attendees_start?: boolean;
    is_open_lobby?: boolean;
    join_permission?: string;
    meeting_type?: string;
    mute_on_join?: string;
    recording_view_permission?: string;
    require_camera_on_join?: boolean;
  };
}

export interface CalendarEvent {
  id: string;
  calendar_id: string;
  summary: string;
  description?: string;
  start_time: CalendarEventTime;
  end_time: CalendarEventTime;
  free_busy_status: 'busy' | 'free';
  status: 'normal' | 'cancelled';
  visibility?: 'default' | 'public' | 'private';
  location?: string;
  locations?: CalendarEventLocation[];
  organizer?: CalendarEventOrganizer;
  reminders?: CalendarEventReminder[];
  recurrence?: CalendarEventRecurrence;
  recurring_event_id?: string;
  original_start_time?: CalendarEventTime;
  online_meeting?: CalendarEventOnlineMeeting;
  attendee_ability?: 'can_see_others' | 'can_invite_others';
}

export interface CalendarListResult {
  items: Calendar[];
  next_page_token?: string;
}

export interface CalendarEventListResult {
  items: CalendarEvent[];
  next_page_token?: string;
  next_sync_token?: string;
}

export interface GetCalendarsParams {
  pageSize?: number;
  pageToken?: string;
}

export interface GetEventsParams {
  calendarId: string;
  startTime?: string; // RFC3339
  endTime?: string; // RFC3339
  pageSize?: number;
  pageToken?: string;
  syncToken?: string;
  anchorTime?: string;
  withCancelled?: boolean;
}

export interface CreateEventParams {
  calendarId: string;
  summary: string;
  startTime: CalendarEventTime;
  endTime: CalendarEventTime;
  description?: string;
  freeBusyStatus?: 'busy' | 'free';
  visibility?: 'default' | 'public' | 'private';
  locations?: CalendarEventLocation[];
  reminders?: CalendarEventReminder[];
  recurrence?: CalendarEventRecurrence;
  attendeeAbility?: 'can_see_others' | 'can_invite_others';
  onlineMeeting?: {
    description?: string;
    provider?: string;
  };
}

export interface UpdateEventParams {
  calendarId: string;
  eventId: string;
  summary?: string;
  startTime?: CalendarEventTime;
  endTime?: CalendarEventTime;
  description?: string;
  freeBusyStatus?: 'busy' | 'free';
  visibility?: 'default' | 'public' | 'private';
  locations?: CalendarEventLocation[];
  reminders?: CalendarEventReminder[];
  recurrence?: CalendarEventRecurrence;
  attendeeAbility?: 'can_see_others' | 'can_invite_others';
  isNotification?: boolean;
  isReinvition?: boolean;
  modType?: 'one' | 'following' | 'all';
}

// ============ 云文档 (Drive) 类型 ============

export interface DriveQuota {
  deleted: number;
  remaining: number;
  total: number;
  used: number;
}

export interface DriveCreator {
  avatar?: string;
  company_id?: string;
  id: string;
  name?: string;
  type: 'user' | 'sp' | 'unknown';
}

export interface DriveExtAttr {
  name: string;
  value: string;
}

export interface Drive {
  id: string;
  name: string;
  allotee_id: string;
  allotee_type: 'user' | 'group' | 'app';
  company_id: string;
  created_by: DriveCreator;
  ctime: number;
  mtime: number;
  description?: string;
  ext_attrs?: DriveExtAttr[];
  quota: DriveQuota;
  source: string;
  status: 'inuse' | 'deleted';
}

export interface DriveListResult {
  items: Drive[];
  next_page_token?: string;
}

export interface DriveFilePermission {
  comment: boolean;
  copy: boolean;
  copy_content: boolean;
  delete: boolean;
  download: boolean;
  history: boolean;
  list: boolean;
  move: boolean;
  new_empty: boolean;
  perm_ctl: boolean;
  preview: boolean;
  print: boolean;
  rename: boolean;
  saveas: boolean;
  secret: boolean;
  share: boolean;
  update: boolean;
  upload: boolean;
}

export interface DriveFileModifier {
  avatar?: string;
  company_id?: string;
  id: string;
  name?: string;
  type: 'user' | 'sp' | 'unknown';
}

export interface DriveFile {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'shortcut';
  drive_id: string;
  parent_id: string;
  created_by: DriveCreator;
  modified_by: DriveFileModifier;
  ctime: number;
  mtime: number;
  size: number;
  version: number;
  shared: boolean;
  link_id?: string;
  link_url?: string;
  ext_attrs?: DriveExtAttr[];
  permission?: DriveFilePermission;
  drive?: Drive;
}

export interface DriveFileListResult {
  items: DriveFile[];
  next_page_token?: string;
}

export interface DriveFileSrc {
  name: string;
  path: string;
  type: string;
}

export interface DriveSearchResultItem {
  file: DriveFile;
  file_src?: DriveFileSrc;
  highlights?: Record<string, string[]>;
  otime?: number;
}

export interface DriveSearchResult {
  items: DriveSearchResultItem[];
  next_page_token?: string;
  total?: number;
}

export interface DriveDownloadInfo {
  url: string;
  hashes?: Array<{
    sum: string;
    type: 'sha256' | 'md5' | 'sha1' | 's2s';
  }>;
}

export interface DriveShareLinkOpts {
  allow_perm_apply?: boolean;
  check_code?: string;
  close_after_expire?: boolean;
  expire_period?: 0 | 7 | 30;
  expire_time?: number;
}

export interface DriveShareLink {
  id: string;
  drive_id: string;
  file_id: string;
  url: string;
  role_id: string;
  scope: 'anyone' | 'company' | 'users';
  status: 'open' | 'closed';
  opts: DriveShareLinkOpts;
  created_by?: DriveCreator;
  ctime: number;
  mtime: number;
}

export interface GetDrivesParams {
  alloteeType: 'user' | 'group' | 'app';
  alloteeId?: string;
  sources?: string[];
  pageSize: number;
  pageToken?: string;
  withExtAttrs?: boolean;
}

export interface ListFilesParams {
  driveId: string;
  parentId: string;
  pageSize: number;
  pageToken?: string;
  withPermission?: boolean;
  withExtAttrs?: boolean;
  filterExts?: string;
  filterType?: string;
  order?: 'asc' | 'desc';
  orderBy?: 'ctime' | 'mtime' | 'dtime' | 'fname' | 'fsize';
}

export interface SearchFilesParams {
  type: 'file_name' | 'content' | 'all';
  keyword?: string;
  pageSize: number;
  pageToken?: string;
  fileType?: 'folder' | 'file' | 'shortcut';
  fileExts?: string[];
  driveIds?: string[];
  parentIds?: string[];
  creatorIds?: string[];
  modifierIds?: string[];
  sharerIds?: string[];
  receiverIds?: string[];
  timeType?: 'ctime' | 'mtime' | 'otime' | 'stime';
  startTime?: number;
  endTime?: number;
  withPermission?: boolean;
  withLink?: boolean;
  withTotal?: boolean;
  withDrive?: boolean;
  order?: 'asc' | 'desc';
  orderBy?: 'ctime' | 'mtime';
  scope?: string[];
  searchOperatorName?: boolean;
}

export interface CreateFolderParams {
  driveId: string;
  parentId: string;
  name: string;
  onNameConflict?: 'fail' | 'rename' | 'overwrite' | 'replace';
}

export interface CreateFileParams {
  driveId: string;
  parentId: string;
  name: string;
  fileType: 'folder' | 'file' | 'shortcut';
  fileId?: string;
  onNameConflict?: 'fail' | 'rename' | 'overwrite' | 'replace';
  parentPath?: string[];
}

export interface DeleteFileParams {
  driveId: string;
  fileId: string;
}

export interface GetDownloadInfoParams {
  driveId: string;
  fileId: string;
  withHash?: boolean;
  internal?: boolean;
  storageBaseDomain?: string;
}

export interface ShareFileParams {
  driveId: string;
  fileId: string;
  roleId: string;
  scope: 'anyone' | 'company' | 'users';
  opts?: DriveShareLinkOpts;
}
