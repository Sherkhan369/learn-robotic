import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar configuration for the robotics textbook
  textbookSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1/chapter-1',
        'module-1/chapter-2',
        'module-1/chapter-3',
        'module-1/chapter-4',
      ],
      link: {
        type: 'generated-index',
        title: 'Module 1: The Robotic Nervous System (ROS 2)',
        description: 'Learn about ROS 2 as the nervous system of robotic systems',
        slug: '/module-1',
      },
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2/chapter-1',
        'module-2/chapter-2',
        'module-2/chapter-3',
        'module-2/chapter-4',
      ],
      link: {
        type: 'generated-index',
        title: 'Module 2: The Digital Twin (Gazebo & Unity)',
        description: 'Explore digital twin technologies for robotics simulation',
        slug: '/module-2',
      },
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      items: [
        'module-3/chapter-1',
        'module-3/chapter-2',
        'module-3/chapter-3',
        'module-3/chapter-4',
      ],
      link: {
        type: 'generated-index',
        title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
        description: 'Discover AI-powered robotics with NVIDIA Isaac™ platform',
        slug: '/module-3',
      },
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'module-4/chapter-1',
        'module-4/chapter-2',
        'module-4/chapter-3',
        'module-4/chapter-4', // Capstone project
      ],
      link: {
        type: 'generated-index',
        title: 'Module 4: Vision-Language-Action (VLA)',
        description: 'Understand Vision-Language-Action models for robotic applications',
        slug: '/module-4',
      },
    },
  ],
};

export default sidebars;
