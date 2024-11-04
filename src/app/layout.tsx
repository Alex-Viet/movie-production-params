import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './styles/globals.scss';

const HelveticaNeueRegular = localFont({
  src: './fonts/HelveticaNeueRegular/HelveticaNeue-Regular.otf',
  variable: '--font-helvetica-neue-regular',
  weight: '400',
});
const InterTightSemiBold = localFont({
  src: './fonts/InterTight/InterTight-SemiBold.ttf',
  variable: '--font-interTight-semiBold',
  weight: '600',
});
const InterTightRegular = localFont({
  src: './fonts/InterTight/InterTight-Regular.ttf',
  variable: '--font-interTight-regular',
  weight: '400',
});
const HelveticaRegular = localFont({
  src: './fonts/Helvetica/helvetica_regular.otf',
  variable: '--font-helvetica-regular',
  weight: '400',
});
const Satoshi = localFont({
  src: './fonts/Satoshi/Satoshi-Regular.woff2',
  variable: '--font-satoshi',
  weight: '500',
});

export const metadata: Metadata = {
  title: 'Параметры фильма',
  description: 'Производственные параметры фильма',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`
          ${HelveticaNeueRegular.variable} 
          ${InterTightSemiBold.variable} 
          ${InterTightRegular.variable} 
          ${HelveticaRegular.variable} 
          ${Satoshi.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
