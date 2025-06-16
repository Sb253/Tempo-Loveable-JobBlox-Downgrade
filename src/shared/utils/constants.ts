
export const APP_CONFIG = {
  name: 'JobBlox',
  version: '2.0.0',
  api: {
    baseUrl: process.env.REACT_APP_API_URL || '/api',
    timeout: 30000,
  },
  map: {
    defaultCenter: [-74.006, 40.7128] as [number, number],
    defaultZoom: 10,
    token: process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1Ijoic2NvdHRiOTcxIiwiYSI6ImNtYng0M2d2cTB2dXkybW9zOTJmdzg1MWQifQ.3rpXH4NfcWycCt58VAyGzg',
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const;

export const JOB_STATUSES = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const CUSTOMER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LEAD: 'lead',
} as const;

export const USER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;
