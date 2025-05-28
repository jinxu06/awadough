import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useLanguage } from '../contexts/LanguageContext'

const HeroContainer = styled.section`
  height: 50vh;
  background: linear-gradient(rgba(44, 62, 80, 0.6), rgba(255, 182, 193, 0.3)), 
              url('https://castcornwall.art/app/uploads/2023/01/My-Neighbour-Totoro-detail-1536x857-1.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.white};
`

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
`

const HeroTitle = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  color: ${theme.colors.white};
`

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
  color: ${theme.colors.white};
`

const Hero = () => {
  const { t } = useLanguage()
  
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>{t('hero.title')}</HeroTitle>
        <HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero
