import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      width: '100%',
      padding: '10px 0',
      backgroundColor: 'transparent',
    }}>
      <nav>
        <ul style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px', 
          listStyle: 'none', 
          margin: 0, 
          padding: '10px 0' 
        }}>
          <li><Link style={{textDecoration: 'none', color: '#ffffff', padding: '5px 10px'}} to="/">Home</Link></li>
          <li><Link style={{textDecoration: 'none', color: '#ffffff', padding: '5px 10px'}} to="/about">About</Link></li>
          <li><Link style={{textDecoration: 'none', color: '#ffffff', padding: '5px 10px'}} to="/services">Services</Link></li>
          <li><Link style={{textDecoration: 'none', color: '#ffffff', padding: '5px 10px'}} to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
