import telegramIcon from "@/assets/telegram-icon.png";
import tiktokIcon from "@/assets/tiktok-icon.png";
import youtubeIcon from "@/assets/youtube-icon.png";

const socialLinks = [
  {
    name: "Telegram",
    url: "https://t.me/Aetherium_server",
    icon: telegramIcon,
    color: "hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(0,188,212,0.6)]"
  },
  {
    name: "TikTok", 
    url: "https://www.tiktok.com/@aetherium_private?_t=ZM-8zrVpQs56Ro&_r=1",
    icon: tiktokIcon,
    color: "hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(0,188,212,0.6)]"
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@aetherium_private?si=gG6vb288d1hmvfGQ",
    icon: youtubeIcon,
    color: "hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(0,188,212,0.6)]"
  }
];

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center space-x-6">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-all duration-300 ${social.color}`}
          aria-label={social.name}
        >
          <img 
            src={social.icon} 
            alt={social.name}
            className="w-12 h-12 rounded-full"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;