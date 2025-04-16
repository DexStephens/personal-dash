export interface CalendarEvent {
  externalId: string;
  title: string;
  start: Date;
  end: Date;
  externalLink: string;
  description: string;
}

export type CalendarContextType = {
  calendarData: CalendarData;
  setCalendarDataWithSync: (data: CalendarData) => void;
};

export type CalendarData = {
  publicId: string;
  accessToken: string;
  calendarId: string;
  events: CalendarEvent[];
};

export type ViewOption = "List" | "Calendar";

export type CalendarDetailModalProps = {
  onClose: (eventDetails?: CalendarEvent) => void;
  eventDetails: CalendarEvent | null;
};

export interface GoogleApiCalendarListResponse {
  items: GoogleApiCalendar[];
}

interface GoogleApiCalendar {
  kind: "calendar#calendarListEntry";
  etag: string;
  id: string;
  summary: string;
  description?: string;
  location?: string;
  timeZone?: string;
  summaryOverride?: string;
  colorId?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  hidden?: boolean;
  selected?: boolean;
  accessRole: string;
  defaultReminders: {
    method: string;
    minutes: number;
  }[];
  notificationSettings: {
    notifications: {
      type: string;
      method: string;
    }[];
  };
  primary?: boolean;
  deleted?: boolean;
  conferenceProperties: {
    allowedConferenceSolutionTypes?: string[];
  };
}

export interface GoogleApiEventListResponse {
  nextPageToken?: string;
  items: GoogleApiEvent[];
}

export interface GoogleApiEvent {
  kind: "calendar#event";
  etag: string;
  id: string;
  status?: string;
  htmlLink: string;
  created: string; // ISO datetime string
  updated: string; // ISO datetime string
  summary: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: string; // YYYY-MM-DD
    dateTime: string; // ISO datetime string
    timeZone?: string;
  };
  end: {
    date: string;
    dateTime: string;
    timeZone?: string;
  };
  endTimeUnspecified: boolean;
  recurrence: string[];
  recurringEventId: string;
  originalStartTime: {
    date: string;
    dateTime: string;
    timeZone?: string;
  };
  transparency?: string;
  visibility?: string;
  iCalUID: string;
  sequence: number;
  attendees: {
    id: string;
    email: string;
    displayName?: string;
    organizer: boolean;
    self: boolean;
    resource?: boolean;
    optional?: boolean;
    responseStatus: string;
    comment?: string;
    additionalGuests?: number;
  }[];
  attendeesOmitted?: boolean;
  extendedProperties: {
    private: Record<string, string>;
    shared: Record<string, string>;
  };
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: {
      entryPointType: string;
      uri: string;
      label?: string;
      pin?: string;
      accessCode?: string;
      meetingCode?: string;
      passcode: string;
      password?: string;
    }[];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId?: string;
    signature?: string;
    notes?: string;
  };
  gadget: {
    type: string;
    title: string;
    link: string;
    iconLink: string;
    width?: number;
    height?: number;
    display: string;
    preferences: Record<string, string>;
  };
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean;
    overrides: {
      method: string;
      minutes: number;
    }[];
  };
  source: {
    url: string;
    title: string;
  };
  workingLocationProperties: {
    type: string;
    homeOffice?: unknown;
    customLocation?: {
      label?: string;
    };
    officeLocation?: {
      buildingId?: string;
      floorId?: string;
      floorSectionId?: string;
      deskId?: string;
      label: string;
    };
  };
  outOfOfficeProperties: {
    autoDeclineMode: string;
    declineMessage: string;
  };
  focusTimeProperties: {
    autoDeclineMode: string;
    declineMessage: string;
    chatStatus: string;
  };
  attachments: {
    fileUrl: string;
    title: string;
    mimeType: string;
    iconLink: string;
    fileId: string;
  }[];
  birthdayProperties: {
    contact: string;
    type: string;
    customTypeName: string;
  };
  eventType: string;
}
