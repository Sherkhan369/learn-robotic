import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Comprehensive Curriculum',
//     description: (
//       <>
//         Four in-depth modules covering everything from ROS 2 fundamentals to advanced Vision-Language-Action systems,
//         providing a complete learning pathway from beginner to advanced robotics concepts.
//       </>
//     ),
//   },
//   {
//     title: 'Practical Learning Approach',
//     description: (
//       <>
//         Each chapter includes learning objectives, hands-on exercises, and key takeaways to ensure you understand
//         and can apply the concepts in real-world robotics scenarios.
//       </>
//     ),
//   },
//   {
//     title: 'Cutting-Edge Technologies',
//     description: (
//       <>
//         Learn with industry-standard tools including ROS 2, Gazebo, Unity, NVIDIA Isaac™, and Vision-Language-Action models
//         that are shaping the future of robotics.
//       </>
//     ),
//   },
// ];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureIcon}>
          <span className={styles.featureIconText}>⚙️</span>
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          
        </div>
      </div>
    </section>
  );
}
