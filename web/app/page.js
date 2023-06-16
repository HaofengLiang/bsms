import Image from "next/image";
import styles from "./page.module.css";
import ResponsiveAppBar from "@/components/appBar";

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <main className={styles.main}>
        <h1>Hello, Next.js!</h1>
      </main>
    </>
  );
}
