import { useState, useRef, MouseEvent } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const imageRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = async () => {
    if (props.video) {
        setIsVideo(true);
        try {
            const response = await fetch(`src/assets/${props.video}`);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setVideo(blobUrl);
        } catch (error) {
            console.error("Error loading video:", error);
        }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; // Division reduces rotation severity
    const y = -(e.clientY - top - height / 2) / 20;

    // Applying the 3D rotation and scale
    imageRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    setIsVideo(false);
    if (!imageRef.current) return;
    imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="work-image">
      <a
        ref={imageRef}
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target="_blank"
        data-cursor={"disable"}
        style={{ transition: "transform 0.1s ease-out", willChange: "transform", display: "block" }}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
        {isVideo && (
          <video
            src={video}
            autoPlay
            muted
            playsInline
            loop
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
          ></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;
