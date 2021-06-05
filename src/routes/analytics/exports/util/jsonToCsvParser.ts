import { Response } from 'express';
import { Parser } from 'json2csv';

export const parseJsonToCsv = (res: Response, fileName: string, fields: any, data: any) => {
	const json2csv = new Parser({ fields });
	const csv = json2csv.parse(data);
	res.header('Content-Type', 'text/csv');
	res.attachment(fileName);
	return res.send(csv);
};
