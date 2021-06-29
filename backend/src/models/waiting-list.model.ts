export interface WaitingListModel {
  id: string;
  name: string;
}

export type CallingStatusEnum = "NotCalled" | "Calling" | "Arrived";

export interface WaitingCustomerModel {
  id: string;
  name: string;
  phoneNumber: string;
  remarks?: string;
  status: CallingStatusEnum;
}

export interface WaitingListDetailsModel extends WaitingListModel {
  customers: WaitingCustomerModel[];
}
