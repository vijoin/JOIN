export interface ItemData {
  id: string;
  calendar: CalendarData;
  name: string;
  description: string;
  image: string;
  location: string;
  platform: string;
  url: string;
  is_online: boolean;
  end_date_timestamp: number;
  start_date_timestamp: number;
  state: string;
  tags: Tag[];
};
export interface CalendarData {
  collectionId: string;
  id: string;
};
export interface Tag {
  id: string;
  name: string;
};
export interface EventResponse {
  data : any;
  error : any;
}