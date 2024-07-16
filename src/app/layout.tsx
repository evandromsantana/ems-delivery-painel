export const metadata = {
  title: "emsfood - delivery",
  description: "Painel do estabelecimento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
