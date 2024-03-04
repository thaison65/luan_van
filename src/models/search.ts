export interface SearchResult {
	_id: string;
	name: string;
	area: string;
	nameCity?: string;
}

export interface SearchQueryResult {
	id_place: string;
	check_in_date: string;
	check_out_date: string;
	number_adults: string;
	number_children?: string[];
	number_room: string;
}

export interface FormQualityResult {
	adult: number;
	arrayAge: string[];
	room: number;
}

export interface RadioSortResult {
	value: string;
	label: string;
}

export interface QuerySearchResult {
	id_place: string;
	check_in_date: Date;
	check_out_date: Date;
	number_adults: number;
	number_children?: number[];
	number_room: number;
}
