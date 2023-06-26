import styles from "@/styles/Home.module.css";
import ResponsiveAppBar from "./appBar";

export default function RootLayout({ children }) {
  return (
    <main>
      <ResponsiveAppBar />
      {children}
    </main>
  );
}
