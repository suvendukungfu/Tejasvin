import NavBar from '../components/NavBar';
import Hero from '../components/Hero';

const Home = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h2>Welcome to Hidden Heritage</h2>
                <p style={{ maxWidth: '700px', margin: '1rem auto' }}>
                    We curate journeys to the most unexplored and breathtaking historical sites in India.
                    Starting with the mystical Chambal region, discover stories that time forgot.
                </p>
            </section>
        </>
    );
};

export default Home;
