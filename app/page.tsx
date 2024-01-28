import Image from "next/image";
import "./home.scss";

export default function Home() {
  return (
    <div>
      <h2 className="Home">HELLO WORLD</h2>
      <div>
        <Image
          alt="Фото"
          className="ProfilePage-MainImage"
          fill={true}
          priority={true}
          sizes="100vw"
          src="https://img.freepik.com/premium-photo/photo-portrait-of-pretty-girl-in-orange-sweater-smiling-isolated-on-bright-teal-color-background_908985-11469.jpg"
          quality={100}
        />
      </div>
    </div>
  );
}
