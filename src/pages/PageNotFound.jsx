export default function PageNotFound() {

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#000000ff', fontFamily: 'Merryweather, serif' }}>404</h1>
            <p style={{ fontSize: '1.5rem', color: '#4e2d2dff', fontFamily: 'open-sans, sans-serif' }}>Oops! The page you're looking for doesn't exist.</p>
        </div>
    )

}