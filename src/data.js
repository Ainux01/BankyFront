import { AiFillDashboard, AiOutlineForm } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { FiActivity } from "react-icons/fi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { BiMessageDetail } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import { FcSettings } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBitcoin } from "react-icons/fa";
export const linksbottom = [
  // {
  //   id: 1,
  //   url: "/accueil/gethelp",
  //   text: "Get Help",
  //   icon: <FiHelpCircle />,
  // },
  {
    id: 2,
    url: "/accueil/settings",
    text: "Settings",
    icon: <FcSettings />,
  },
];

export const links = [
  {
    id: 1,
    url: "/accueil/dashboard",
    text: "Dashboard",
    icon: <AiFillDashboard />,
  },

  {
    id: 2,
    url: "/accueil/activity",
    text: "Activity",
    icon: <FiActivity />,
  },
  {
    id: 4,
    url: "/accueil/loans",
    text: "Loan",
    icon: <AiOutlineForm />,
  },
  {
    id: 6,
    url: "/accueil/crypto",
    text: "CryptoCurrency",
    icon: <FaBitcoin />,
  },
  // {
  //   id: 3,
  //   url: "/accueil/analytics",
  //   text: "Analytics",
  //   icon: <TbDeviceAnalytics />,
  // },

  // {
  //   id: 5,
  //   url: "/accueil/messages",
  //   text: "Messages",
  //   icon: <BiMessageDetail />,
  // },
];
