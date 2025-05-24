import { Header, Hero, Footer } from '@components';

export default function Home() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='flex-grow mt-5'>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
