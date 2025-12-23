import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start Learning - Introduction
              </Link>
              <Link
                className="button button--primary button--lg margin-left--sm"
                to="/docs">
                View Full Curriculum
              </Link>
            </div>
          </div>
          <div className={styles.heroLogo}>
            <img
              src="/img/logo.svg"
              alt="Robotics Textbook Logo"
              className={styles.heroLogoImg}
            />
          </div>
        </div>
      </div>

    </header>
  );
}
function HomepageModules() {
  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center ">
            <Heading as="h2" className="text--center">
              Four Comprehensive Modules
            </Heading>
            <p className="padding-horiz--lg">
              Explore the complete curriculum designed to take you from robotics fundamentals to advanced AI integration
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col col--3 padding--sm">
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>🤖</div>
              <Heading as="h3">Module 1</Heading>
              <p>The Robotic Nervous System (ROS 2)</p>
              <p>Foundation of robotic communication and control</p>
            </div>
          </div>
          <div className="col col--3 padding--sm">
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>🏗️</div>
              <Heading as="h3">Module 2</Heading>
              <p>The Digital Twin (Gazebo & Unity)</p>
              <p>Simulation and virtual environments for robotics</p>
            </div>
          </div>
          <div className="col col--3 padding--sm">
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>🧠</div>
              <Heading as="h3">Module 3</Heading>
              <p>The AI-Robot Brain (NVIDIA Isaac™)</p>
              <p>Artificial intelligence integration in robotics</p>
            </div>
          </div>
          <div className="col col--3 padding--sm">
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>👁️</div>
              <Heading as="h3">Module 4</Heading>
              <p>Vision-Language-Action (VLA)</p>
              <p>Advanced multimodal robotic systems</p>
            </div>
          </div>
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
      
    </Layout>
  );
}
