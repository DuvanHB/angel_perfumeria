import whatsappIcon from "../assets/img/whatsapp.png";
import instagramIcon from "../assets/img/instagram.png";

export default function Header({ onBurgerClick }) {
  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <button className="burger" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} onClick={onBurgerClick}>
        &#9776;
      </button>
  <span className="header-title">Ángel<span className="header-subtitle-desktop" style={{paddingLeft: "1.5rem"}}>perfumería</span></span>
      <div className="header-icons">
        <a href="https://wa.me/573195769790" target="_blank" rel="noopener noreferrer">
          <img src={whatsappIcon} alt="WhatsApp" />
        </a>
        <a href="https://www.instagram.com/fragancias_de_angel?igsh=MWt3ZXN1dXNnbDI5bQ==" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .header-subtitle-desktop {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
