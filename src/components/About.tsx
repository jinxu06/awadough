import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useLanguage } from '../contexts/LanguageContext'

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${theme.colors.accentLight}20, ${theme.colors.white});
`

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.primary};
  font-weight: 300;
  
  span {
    color: ${theme.colors.accent};
  }
`

const AboutText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.gray};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

const About = () => {
  const { t } = useLanguage()
  
  return (
    <AboutSection id="about">
      <AboutContent>
        <AboutTitle>{t('about.title').split(' ')[0]} <span>{t('about.title').split(' ')[1]}</span></AboutTitle>
        <AboutText>{t('about.text1')}</AboutText>
        <AboutText>{t('about.text2')}</AboutText>
      </AboutContent>
    </AboutSection>
  )
}

export default About
