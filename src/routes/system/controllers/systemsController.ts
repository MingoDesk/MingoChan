import { body } from 'express-validator';

interface ITag {
	name: string;
	color: string;
	backgroundColor: string;
}

// TODO: Figure out how the hell we should do templates
// interface ITemplate {}

export enum Tier {
	t1 = 'T1',
	t2 = 'T2',
	t3 = 'T3',
	t4 = 'T4',
}

export enum PrefDataType {
	json = 'JSON',
	csv = 'CSV',
}

export enum AvgUserSatisfaction {
	bad = 1,
	okay,
	awesome,
}

export enum Themes {
	light = 'light',
	dark = 'dark',
}

interface IGroup {
	name: string;
	members: string[];
	tier: Tier;
	star: boolean;
}

export interface ISystemSettings {
	tags?: ITag[];
	ratings: boolean;
	snoozing: boolean;
	defaultTheme: Themes;
	allowNotesEdit: boolean;
	allowUserSeeTicketStatus: boolean;
	groups?: IGroup[];
	avgUserSatisfaction: AvgUserSatisfaction;
	avgResponseTime?: string;
	prefDataType: PrefDataType;
}

const validate = (method: string) => {
	switch (method) {
		case 'update': {
			return [
				body('tags').isArray(),
				body('ratings').isBoolean(),
				body('snoozing').isBoolean(),
				body('defaultTheme')
					.isString()
					.matches(/^(light|dark)$/),
				body('allowNotesEdit').isBoolean(),
				body('prefDataType')
					.isString()
					.matches(/^(JSON|CSV)$/),
			];
		}
	}
};

export { validate };
