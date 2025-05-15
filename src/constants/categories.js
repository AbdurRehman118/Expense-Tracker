import {
  faHome,
  faBriefcase,
  faBuilding,
  faCar,
  faUtensils,
  faMedkit,
  faGamepad,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

export const DEFAULT_CATEGORIES = [
  { id: 'home', name: 'Home', icon: faHome },
  { id: 'work', name: 'Work', icon: faBriefcase },
  { id: 'business', name: 'Business', icon: faBuilding },
  { id: 'transportation', name: 'Transportation', icon: faCar },
  { id: 'food', name: 'Food', icon: faUtensils },
  { id: 'healthcare', name: 'Healthcare', icon: faMedkit },
  { id: 'entertainment', name: 'Entertainment', icon: faGamepad },
  { id: 'other', name: 'Other', icon: faEllipsisH }
]; 