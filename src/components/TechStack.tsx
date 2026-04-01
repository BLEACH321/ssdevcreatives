import { motion, Variants } from "framer-motion";
import { 
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiKotlin, 
  SiHtml5, SiCss, SiGnubash, SiReact, SiNextdotjs, SiBootstrap,
  SiNodedotjs, SiDjango, SiFlask, SiFastapi, SiTensorflow, SiPytorch,
  SiScikitlearn, SiOpencv, SiNumpy, SiTailwindcss, SiPandas, SiMysql,
  SiPostgresql, SiMongodb, SiFirebase, SiRedis, SiDocker,
  SiGit, SiGithub, SiLinux, SiVercel,
  SiJupyter, SiFigma, SiPostman
} from "react-icons/si";
import { TbBrandAdobePhotoshop } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { VscAzure, VscVscode } from "react-icons/vsc";

import "./styles/TechStack.css";

const techRows = [
  [
    { name: "Python", icon: SiPython },
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "C", icon: SiC },
    { name: "C++", icon: SiCplusplus },
    { name: "Kotlin", icon: SiKotlin },
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss },
    { name: "Bash", icon: SiGnubash },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Bootstrap", icon: SiBootstrap },
  ],
  [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Django", icon: SiDjango },
    { name: "Flask", icon: SiFlask },
    { name: "FastAPI", icon: SiFastapi },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "PyTorch", icon: SiPytorch },
    { name: "Scikit-learn", icon: SiScikitlearn },
    { name: "OpenCV", icon: SiOpencv },
    { name: "NumPy", icon: SiNumpy },
    { name: "Tailwind", icon: SiTailwindcss },
  ],
  [
    { name: "Pandas", icon: SiPandas },
    { name: "MySQL", icon: SiMysql },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Firebase", icon: SiFirebase },
    { name: "Redis", icon: SiRedis },
    { name: "Docker", icon: SiDocker },
    { name: "Azure", icon: VscAzure },
  ],
  [
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "Linux", icon: SiLinux },
    { name: "AWS", icon: FaAws },
    { name: "VS Code", icon: VscVscode },
    { name: "Vercel", icon: SiVercel },
  ],
  [
    { name: "Jupyter", icon: SiJupyter },
    { name: "Figma", icon: SiFigma },
    { name: "Postman", icon: SiPostman },
    { name: "Photoshop", icon: TbBrandAdobePhotoshop },
  ],
];

const TechStack = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="techstack-container" id="techstack">

      
      <motion.h2 
        className="techstack-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Tech Stack
      </motion.h2>

      <motion.div 
        className="tech-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {techRows.map((row, rowIndex) => (
          <div key={rowIndex} className="tech-row">
            {row.map((tech, techIndex) => (
              <motion.div 
                key={`${rowIndex}-${techIndex}`}
                className="tech-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(168, 85, 247, 0.5)"
                }}
              >
                <tech.icon className="tech-icon" />
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>


    </section>
  );
};

export default TechStack;
