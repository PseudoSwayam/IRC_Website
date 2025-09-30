import './globals.css'

export const metadata = {
  title: 'ITER Robotics Club',
  description: 'From autonomous bots to national competitions — we engineer solutions that inspire the future.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}