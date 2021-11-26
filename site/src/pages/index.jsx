import styles from "./Home.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";

import Container from "@components/layout/Container/Container";
import Layout from "@components/utility/Metadata";

const pageWrapper = {
  initial: {
    opacity: 0,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  in: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const heading = {
  initial: {
    opacity: 0,
    y: 15,
    transition: {
      ease: "easeInOut",
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const articles = {
  initial: {
    opacity: 0,
    y: 15,
    transition: {
      ease: "easeInOut",
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <motion.div
      exit={"inital"}
      initial={"initial"}
      animate={"in"}
      variants={pageWrapper}
    >
      <Layout>
        <Container>
          <main className={styles.wrapper}>
            <motion.h1 variants={heading}>Experiments</motion.h1>
            <div className={styles.grid}>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.framerMotion}
              >
                <h2>Framer Motion</h2>
                <Link href="/framer-motion/001">Example 001</Link>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.threeJS}
              >
                <h2>Three.js</h2>
                <p>Coming soon.</p>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.aframe}
              >
                <h2>AFrame</h2>
                <p>Coming soon.</p>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.electron}
              >
                <h2>Electron</h2>
                <Link href="https://github.com/Radlad-io/RadBooth-App">
                  <div>
                    Radbooth
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 0 24 24"
                      width="16px"
                      fill="#000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.reactNative}
              >
                <h2>React Native</h2>
                <p>Coming soon.</p>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.nodejs}
              >
                <h2>Node.JS</h2>
                <Link href="https://github.com/Radlad-io/Soundbot">
                  <div>
                    SoundBot
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 0 24 24"
                      width="16px"
                      fill="#000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.nodejs}
              >
                <h2>TensorFlow.JS</h2>
                <p>Coming soon.</p>
              </motion.article>
              <motion.article
                variants={articles}
                className={styles.block}
                id={styles.nodejs}
              >
                <h2>Blender</h2>
                <Link href="https://github.com/Radlad-io/Soundbot">
                  <div>
                    SoundBot
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 0 24 24"
                      width="16px"
                      fill="#000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
            </div>
          </main>
        </Container>
      </Layout>
    </motion.div>
  );
}
