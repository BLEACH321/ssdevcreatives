import { useEffect, useState, useMemo } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [complete, setComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const logs = useMemo(() => [
    { threshold: 0, text: "> INITIALIZING CORE_FILES..." },
    { threshold: 15, text: "> LOADING NEURAL_ASSETS... [OK]", className: "ok" },
    { threshold: 30, text: "> ESTABLISHING SECURE_LINK..." },
    { threshold: 45, text: "> SYNCHRONIZING PROTOCOLS... 45%", className: "ok" },
    { threshold: 60, text: "> OPTIMIZING RENDER_ENGINE..." },
    { threshold: 75, text: "> PARSING PROJECT_METADATA... [OK]", className: "ok" },
    { threshold: 90, text: "> FINALIZING NEURAL_SYNC..." },
    { threshold: 100, text: "> SYSTEM READY. WELCOME.", className: "ok" },
  ], []);

  const visibleLogs = logs.filter(log => percent >= log.threshold);

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => {
        setComplete(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            import("./utils/initialFX").then((module) => {
              if (module.initialFX) {
                module.initialFX();
              }
              setIsLoading(false);
            });
          }, 300);
        }, 300);
      }, 200);
    }
  }, [percent, setIsLoading]);

  return (
    <div className={`loading-screen ${complete ? "complete" : ""} ${fadeOut ? "fade-out" : ""}`}>
      <div className="scanline"></div>
      
      <header className="loading-header">
        <a href="/" className="loader-title">SS CREATIVES</a>
      </header>

      <div className="loading-core-container">
        <div className="core-outer-ring"></div>
        <div className="core-inner-ring"></div>
        <div className="core-center">SS</div>
      </div>

      <div className="status-logs">
        {visibleLogs.map((log, i) => (
          <div key={i} className={`log-entry ${log.className || ""}`}>
            {log.text}
          </div>
        ))}
      </div>

      <div className="progress-wrapper">
        <div className="progress-info">
          SYNC_PROGRESS: {percent}%
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percent}%` }}
          ></div>
          <div className="progress-glitch"></div>
        </div>
      </div>

      <div className="welcome-msg">
        Welcome
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 10);
      percent = Math.min(percent + rand, 100);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = Math.min(percent + Math.round(Math.random() * 8), 100);
        setLoading(percent);
        if (percent >= 100) {
          clearInterval(interval);
        }
      }, 50); // Fast continuous progress
    }
  }, 40);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      let p = percent;
      const fastInterval = setInterval(() => {
        if (p < 100) {
          p += 2;
          setLoading(Math.min(p, 100));
        } else {
          resolve(100);
          clearInterval(fastInterval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};

