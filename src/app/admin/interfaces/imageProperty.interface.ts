// Generated by https://quicktype.io

export interface Image {
  content:       Content[];
  totalElements: number;
  totalPages:    number;
  page:          number;
  size:          number;
  sort:          string[];
}

export interface Content {
  id:       string;
  name:     string;
  url:      string;
  property: number;
}
