import "./globals.css";

export const metadata = {
  title: "SentinelOps",
  description: "Predictive Incident Intelligence Platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
