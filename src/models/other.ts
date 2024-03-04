import { RoomResult } from './hotel';
import { BookingResult, HotelResult } from './product';

export interface HistoryDetailResutl {
	booking?: BookingResult;
	hotel?: HotelResult;
	rooms?: RoomResult[];
}
