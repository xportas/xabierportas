import "./globals.css";


export const metadata = {
  metadataBase: new URL('https://xabierportas.vercel.app'),
  title: "Xabier Portas | Full Stack Developer ",
  description: "Xabier Portas | Desarrollador Full Stack en Pamplona - .NET, React, PostgreSQL, GIS, GeoServer, OpenLayers",
  keywords: "Xabier Portas, xportas, desarrollador, web, Full Stack, programador, Pamplona, .NET, React, JavaScript, C#, PostgreSQL, GeoServer, OpenLayers, GIS",
  author: "Xabier Portas",
  robots: "index, follow",
  openGraph: {
    title: "Xabier Portas | Full Stack Developer ",
    description: "Xabier Portas | Desarrollador Full Stack en Pamplona - .NET, React, PostgreSQL, GIS, GeoServer, OpenLayers",
    url: "https://xabierportas.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/xportas-img.jpeg",
        width: 1200,
        height: 630,
        alt: "Xabier Portas - Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Xabier Portas | Desarrollador Full Stack en Pamplona - .NET & React",
    description: "Xabier Portas | Desarrollador Full Stack en Pamplona - .NET, React, PostgreSQL, GIS, GeoServer, OpenLayers",
    images: ["/images/xportas-img.jpeg"],
  },
  verification: {
    google: "idGGRcrWEq0-v8J00oWbGGgN9CEABvyeaI1Ng6Cr-7c",
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className="font-main bg-orange-200 text-main-gray" translate="no">{children}</body>
    </html>
  );
}