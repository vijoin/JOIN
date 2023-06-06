import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PageLayout from '../layouts/PageLayout';
import Hero from '../components/Hero';
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageLayout
        title='Home'
        footer={true}
      >
        <Hero />
      </PageLayout>
    </div>
  );
};

export default Home;
