export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface MenuItem {
  _id: string;
  title: string;
  link?: string;
  isDropdown: boolean;
}
