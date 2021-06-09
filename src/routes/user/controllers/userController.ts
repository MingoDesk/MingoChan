export enum UserPermissions {
	EditNote = 'edit:notes',
	EditOtherUserData = 'edit:other-user-settings',
	EditSystemSettings = 'edit:system-settings',
	ViewAllTickets = 'view:all-tickets',
	ViewAllOrgTickets = 'view:all-organisation-tickets',
	CreateNote = 'create:note',
	ReplyTicket = 'reply:ticket',
	CreateTicket = 'create:ticket',
	ViewCreatedTickets = 'view:ticket',
}

export interface IUser {
	permissions: [UserPermissions.CreateTicket, UserPermissions.ReplyTicket, UserPermissions.ViewCreatedTickets];
}

export const User = {
	permissions: [UserPermissions.CreateTicket, UserPermissions.ReplyTicket, UserPermissions.ViewCreatedTickets],
};

export interface IOrgUser {
	permissions: [
		UserPermissions.CreateTicket,
		UserPermissions.ReplyTicket,
		UserPermissions.ViewAllOrgTickets,
		UserPermissions.ViewCreatedTickets,
	];
}

export const OrgUser: IOrgUser = {
	permissions: [
		UserPermissions.CreateTicket,
		UserPermissions.ReplyTicket,
		UserPermissions.ViewAllOrgTickets,
		UserPermissions.ViewCreatedTickets,
	],
};

export interface IStaff {
	permissions: [
		UserPermissions.CreateNote,
		UserPermissions.ViewAllTickets,
		UserPermissions.ReplyTicket,
		UserPermissions.CreateTicket,
	];
}

export const Staff: IStaff = {
	permissions: [
		UserPermissions.CreateNote,
		UserPermissions.ViewAllTickets,
		UserPermissions.ReplyTicket,
		UserPermissions.CreateTicket,
	],
};

export interface IStaffAdmin {
	permissions: [
		UserPermissions.EditNote,
		UserPermissions.CreateNote,
		UserPermissions.EditSystemSettings,
		UserPermissions.ViewAllTickets,
		UserPermissions.ReplyTicket,
		UserPermissions.EditOtherUserData,
		UserPermissions.CreateTicket,
	];
}

export const StaffAdmin: IStaffAdmin = {
	permissions: [
		UserPermissions.EditNote,
		UserPermissions.CreateNote,
		UserPermissions.EditSystemSettings,
		UserPermissions.ViewAllTickets,
		UserPermissions.ReplyTicket,
		UserPermissions.EditOtherUserData,
		UserPermissions.CreateTicket,
	],
};

export interface ISysAdmin {
	permissions: UserPermissions[];
}

export const SysAdmin: ISysAdmin = {
	permissions: Object.values(UserPermissions),
};
