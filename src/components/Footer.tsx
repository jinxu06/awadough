import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useLanguage } from '../contexts/LanguageContext'

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 3rem 2rem 2rem;
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-weight: 500;
    color: ${theme.colors.accent};
  }
  
  p, li {
    color: ${theme.colors.white};
    opacity: 0.9;
    line-height: 1.8;
  }
  
  ul {
    list-style: none;
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${theme.colors.primaryDark};
  color: ${theme.colors.white};
  opacity: 0.7;
`

const Footer = () => {
  const { t, language } = useLanguage()
  
  return (
    <FooterContainer id="contact">
      <FooterContent>
        <FooterSection>
          <h3>{t('footer.contact')}</h3>
          <p>2 Bissell St<br />
          Birmingham B5 7HP<br />
          {language === 'en' ? 'Phone' : '电话'}: 07761 901518<br />
          {language === 'en' ? 'Email' : '邮箱'}: hello@awadough.co.uk</p>
        </FooterSection>
        <FooterSection>
          <h3>{t('footer.ordering')}</h3>
          <ul>
            <li>{t('footer.orderDeadline')}</li>
            <li>{t('footer.pickup')}</li>
            <li>{t('footer.delivery')}</li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>{t('footer.follow')}</h3>
          <p>
            Instagram: @awadough_birmingham<br />
            {language === 'en' ? 'WeChat' : '微信'}: AwaDoughBakery<br />
            {language === 'en' ? 'RedNote' : '小红书'}: @阿瓦面包坊
          </p>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <p>{t('footer.copyright')}</p>
      </Copyright>
    </FooterContainer>
  )
}

export default Footer
