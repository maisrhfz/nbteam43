export const metadata = {
  title: "NAVER Late API",
  description: "Backend for the NAVER Late (Newbithon) project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "monospace", padding: 24 }}>{children}</body>
    </html>
  );
}
