import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useLanguage } from '../contexts/LanguageContext'

const HeaderContainer = styled.header`
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${theme.shadows.small};
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  
  span {
    color: ${theme.colors.accent};
  }
`

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const NavLink = styled.li`
  a {
    color: ${theme.colors.primary};
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: ${theme.colors.accent};
      transition: width 0.3s;
    }
    
    &:hover {
      color: ${theme.colors.accent};
      
      &:after {
        width: 100%;
      }
    }
  }
`

const LanguageSwitch = styled.button`
  background: ${theme.colors.accent};
  color: ${theme.colors.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background: ${theme.colors.accentDark};
  }
`

const Header = () => {
  const { t, language, setLanguage } = useLanguage()
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo>{language === 'en' ? 'Awa' : '阿瓦'}<span>{language === 'en' ? 'dough' : '面包坊'}</span></Logo>
        <NavRight>
          <NavLinks>
            <NavLink>
              <a href="#products" onClick={(e) => handleScroll(e, 'products')}>
                {t('nav.products')}
              </a>
            </NavLink>
            <NavLink>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')}>
                {t('nav.about')}
              </a>
            </NavLink>
            <NavLink>
              <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
                {t('nav.contact')}
              </a>
            </NavLink>
          </NavLinks>
          <LanguageSwitch onClick={toggleLanguage}>
            {language === 'en' ? '中文' : 'English'}
          </LanguageSwitch>
        </NavRight>
      </Nav>
    </HeaderContainer>
  )
}

export default Header
