import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>🤖 The Future of Robotics Education</div>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className={clsx('button button--lg', styles.buttonPrimary)}
                to="/docs/intro">
                🚀 Start Learning
              </Link>
              <Link
                className={clsx('button button--lg', styles.buttonSecondary)}
                to="/docs/module-1/chapter-1">
                📚 View Curriculum
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>Modules</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Chapters</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Free</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <img
                src="/img/logo.svg"
                alt="Robotics Textbook Logo"
                className={styles.heroLogoImg}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
function HomepageModules() {
  const modules = [
    {
      icon: '🤖',
      number: '01',
      title: 'Robotic Nervous System',
      subtitle: 'ROS 2 Fundamentals',
      description: 'Master the foundation of robotic communication, control systems, and real-time processing',
      link: '/docs/module-1/chapter-1',
      color: '#2e8555'
    },
    {
      icon: '🏗️',
      number: '02',
      title: 'Digital Twin',
      subtitle: 'Gazebo & Unity',
      description: 'Build and test robots in realistic simulation environments before physical deployment',
      link: '/docs/module-2/chapter-1',
      color: '#25c2a0'
    },
    {
      icon: '🧠',
      number: '03',
      title: 'AI-Robot Brain',
      subtitle: 'NVIDIA Isaac™',
      description: 'Integrate cutting-edge AI and machine learning into robotic systems',
      link: '#',
      color: '#1c7ed6'
    },
    {
      icon: '👁️',
      number: '04',
      title: 'Vision-Language-Action',
      subtitle: 'VLA Systems',
      description: 'Create multimodal robots that see, understand language, and take intelligent actions',
      link: '#',
      color: '#7950f2'
    }
  ];

  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Comprehensive Learning Path
          </Heading>
          <p className={styles.sectionSubtitle}>
            From fundamentals to advanced AI integration - everything you need to build intelligent robotic systems
          </p>
        </div>

        <div className={styles.modulesGrid}>
          {modules.map((module, idx) => (
            <Link to={module.link} key={idx} className={styles.moduleCard}>
              <div className={styles.moduleNumber}>{module.number}</div>
              <div className={styles.moduleIcon}>{module.icon}</div>
              <Heading as="h3" className={styles.moduleTitle}>{module.title}</Heading>
              <div className={styles.moduleSubtitle}>{module.subtitle}</div>
              <p className={styles.moduleDescription}>{module.description}</p>
              <div className={styles.moduleArrow}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageFeatures() {
  const features = [
    {
      icon: '📖',
      title: 'Comprehensive Content',
      description: 'Structured curriculum covering everything from basics to advanced topics in robotics and AI'
    },
    {
      icon: '💻',
      title: 'Hands-on Projects',
      description: 'Practical exercises and real-world projects to reinforce your learning'
    },
    {
      icon: '🎓',
      title: 'Industry Standards',
      description: 'Learn tools and frameworks used by leading robotics companies worldwide'
    },
    {
      icon: '🔄',
      title: 'Always Updated',
      description: 'Content regularly updated to reflect the latest developments in robotics and AI'
    },
    {
      icon: '🌐',
      title: 'Open Source',
      description: 'Free and open-source educational resource available to everyone'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Join a growing community of robotics enthusiasts and professionals'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Why Choose This Textbook?
          </Heading>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <Heading as="h3" className={styles.featureTitle}>{feature.title}</Heading>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home - ${siteConfig.title}`}
      description="Comprehensive textbook on Physical AI & Humanoid Robotics">
      <HomepageHeader />
      <HomepageModules />
      <HomepageFeatures />
    </Layout>
  );
}
