import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';
import vk from '../../assets/images/vk.svg';
import linkedin from '../../assets/images/linkedin.svg';

import { Icon } from '../icon/icon';
import { Container } from '../container/container';

export function Footer() {
  return (
    <footer className='footer'>
      <Container className='container footer-container'>
        <p className="footer-text">© 2020-2023 Cleverland. Все права защищены.</p>
        <div className="footer-social">
          <Link to='#'>
            <Icon src={facebook} alt='facebook' />
          </Link>
          <Link to='#'>
            <Icon src={instagram} alt='instagram' />
          </Link>
          <Link to='#'>
            <Icon src={vk} alt='vk' />
          </Link>
          <Link to='#'>
            <Icon src={linkedin} alt='linkedin' />
          </Link>
        </div>
      </Container>
    </footer>
  )
}
