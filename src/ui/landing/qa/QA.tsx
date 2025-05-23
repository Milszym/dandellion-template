/** @jsxImportSource @emotion/react */
import {useTranslation} from "react-i18next"
import {Fullscreen} from "../../components/Fullscreen"
import {MyHeader} from "../../components/text/MyHeader"
import {withMyTheme} from "../../theme/theme"
import {css, Theme} from "@mui/material"
import {useState} from "react"
import SwipeableViews from "react-swipeable-views"
import {bindKeyboard} from "react-swipeable-views-utils"
import {mobileCss} from "../../theme/isMobile"
import {tabletCss} from "../../theme/isTablet"

const BoundSwipeableViews = bindKeyboard(SwipeableViews)

const BoxStyle = withMyTheme((theme: Theme) => css`
    color: ${theme.palette.text.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: ${theme.typography.body1.fontFamily};
`)

const HeaderStyle = withMyTheme((theme: Theme) => css`
    color: ${theme.palette.primary.main};
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    ${tabletCss(`
        font-size: 2.5rem;
    `)}
    ${mobileCss(`
        font-size: 2rem;
        margin-bottom: 1.5rem;
    `)}
`)

const DesktopContainerStyle = withMyTheme((theme: Theme) => css`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
    box-sizing: border-box;
    ${tabletCss(`
        flex-direction: column;
        gap: 1.5rem;
        max-width: 95%;
    `)}
    ${mobileCss(`
        display: none;
    `)}
`)

const MobileContainerStyle = withMyTheme((theme: Theme) => css`
    display: none;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
    ${mobileCss(`
        display: block;
        max-width: 90%;
    `)}
`)

const SectionStyle = withMyTheme((theme: Theme) => css`
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    ${tabletCss(`
        padding: 1.5rem;
    `)}
    ${mobileCss(`
        padding: 1.25rem;
    `)}
`)

const SectionTitleStyle = withMyTheme((theme: Theme) => css`
    color: ${theme.palette.primary.main};
    font-size: clamp(2rem, 2vw, 3rem);
    margin-bottom: 1.5rem;
    text-align: center;
    font-family: ${theme.typography.h1.fontFamily};
    font-weight: 500;
    ${tabletCss(`
        margin-bottom: 1.25rem;
    `)}
    ${mobileCss(`
        margin-bottom: 1rem;
    `)}
`)

const QAStyle = withMyTheme((theme: Theme) => css`
    margin-bottom: 1.5rem;
`)

const QuestionStyle = withMyTheme((theme: Theme) => css`
    color: ${theme.palette.secondary.main};
    font-size: clamp(1.4rem, 1.4vw, 1.6rem);
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-family: ${theme.typography.body1.fontFamily};
`)

const AnswerStyle = withMyTheme((theme: Theme) => css`
    color: ${theme.palette.text.primary};
    font-size: clamp(1.3rem, 1.3vw, 1.5rem);
    line-height: 1.6;
    font-family: ${theme.typography.body1.fontFamily};
`)

const MobileSlideStyle = withMyTheme((theme: Theme) => css`
    padding: 0 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    ${mobileCss(`
        padding: 1rem 1rem;
    `)}
`)

interface Section {
    title: string;
    items: Array<{
        q: string;
        a: string;
    }>;
}

export const QA = () => {
    const {t} = useTranslation()
    const [index, setIndex] = useState(0)

    const sections: Section[] = [
        {
            title: t('qa.ceremony.title'),
            items: [
                {q: t('qa.ceremony.q1'), a: t('qa.ceremony.a1')},
                {q: t('qa.ceremony.q2'), a: t('qa.ceremony.a2')},
                {q: t('qa.ceremony.q3'), a: t('qa.ceremony.a3')}
            ]
        },
        {
            title: t('qa.wedding.title'),
            items: [
                {q: t('qa.wedding.q1'), a: t('qa.wedding.a1')},
                {q: t('qa.wedding.q2'), a: t('qa.wedding.a2')},
                {q: t('qa.wedding.q3'), a: t('qa.wedding.a3')}
            ]
        },
        {
            title: t('qa.accommodation.title'),
            items: [
                {q: t('qa.accommodation.q1'), a: t('qa.accommodation.a1')},
                {q: t('qa.accommodation.q2'), a: t('qa.accommodation.a2')},
                {q: t('qa.accommodation.q3'), a: t('qa.accommodation.a3')}
            ]
        }
    ]

    const renderSection = (section: Section, isMobile: boolean = false) => (
        <div css={SectionStyle}>
            <h2 css={SectionTitleStyle}>{section.title}</h2>
            {section.items.map((item, idx) => (
                <div key={idx} css={QAStyle}>
                    <div css={QuestionStyle}>{item.q}</div>
                    <div css={AnswerStyle}>{item.a}</div>
                </div>
            ))}
        </div>
    )

    return (
        <Fullscreen additionalCss={BoxStyle}>
            <MyHeader text={t('qa.title')} additionalCss={HeaderStyle}/>

            {/* Desktop View */}
            <div css={DesktopContainerStyle}>
                {sections.map((section, idx) => (
                    renderSection(section)
                ))}
            </div>

            {/* Mobile View */}
            <div css={MobileContainerStyle}>
                <BoundSwipeableViews
                    index={index}
                    onChangeIndex={setIndex}
                    enableMouseEvents
                >
                    {sections.map((section, idx) => (
                        <div key={idx} css={MobileSlideStyle}>
                            {renderSection(section, true)}
                        </div>
                    ))}
                </BoundSwipeableViews>
            </div>
        </Fullscreen>
    )
} 
