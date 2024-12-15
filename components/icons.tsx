import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Mail,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Sun,
  Trash,
  User,
  UserX,
  X,
  LogOut,
  PaintRoller,
  TreePine,
  SunMoon,
  Music2,
  Asterisk,
  Square,
  Eye,
  EyeOffIcon,
  type Icon as LucideIcon,
} from "lucide-react";

import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export type Icon = LucideIcon;

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  mail: Mail,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  userX: UserX,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  help: HelpCircle,
  pizza: Pizza,
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  check: Check,
  logOut: LogOut,
  paintRoller: PaintRoller,
  sunMoon: SunMoon,
  tree: TreePine,
  music2: Music2,
  asterisk: Asterisk,
  square: Square,
  eye: Eye,
  eyeOff: EyeOffIcon,

  telegram: FaTelegramPlane,
  twitter: FaXTwitter,
  insta: FaInstagram,
};
