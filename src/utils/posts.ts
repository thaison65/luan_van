import { GroupedRoom, RoomResult } from '~/models';

export const StatusBooking = (status: string) => {
	if (status === 'PendingConfirmation') {
		return 'green';
	}
	if (status === 'Confirmed') {
		return 'green';
	}
	if (status === 'Completed') {
		return 'red';
	}
	return 'GrayText';
};

export const StatusBookingConvertVN = (status: string) => {
	if (status === 'PendingConfirmation') {
		return 'Đang chờ xác nhận';
	}
	if (status === 'Confirmed') {
		return 'Đã đặt thành công';
	}
	if (status === 'Completed') {
		return 'Đã trả phòng';
	}
	return 'Đơn đặt đã bị hủy';
};

export const groupedRooms = (rooms: RoomResult[]): GroupedRoom[] => {
	// Tạo một đối tượng để lưu trữ các phòng theo id_roomType
	const groupedRooms: GroupedRoom[] = Object.values(
		rooms.reduce<{ [key: string]: GroupedRoom }>((acc, room) => {
			const { id_roomType } = room;
			if (acc[id_roomType._id]) {
				acc[id_roomType._id].count += 1;
			} else {
				acc[id_roomType._id] = {
					roomType: id_roomType,
					count: 1,
				};
			}
			return acc;
		}, {})
	);

	return groupedRooms;
};
