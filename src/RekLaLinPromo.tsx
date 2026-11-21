import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {OVERLAP, SCENES, SceneId} from './config';
import {AudioLayer} from './AudioLayer';
import {GlobalStyles, SceneExit} from './components/Common';
import {Scene1Intro} from './scenes/Scene1Intro';
import {Scene2Services} from './scenes/Scene2Services';
import {Scene3Apply} from './scenes/Scene3Apply';
import {Scene4Workflow} from './scenes/Scene4Workflow';
import {Scene5Technical} from './scenes/Scene5Technical';
import {Scene6Review} from './scenes/Scene6Review';
import {Scene7Delivery} from './scenes/Scene7Delivery';
import {Scene8SurveyClosing} from './scenes/Scene8SurveyClosing';
import {Scene1IntroV} from './scenes/vertical/Scene1IntroV';
import {Scene2ServicesV} from './scenes/vertical/Scene2ServicesV';
import {Scene3ApplyV} from './scenes/vertical/Scene3ApplyV';
import {Scene4WorkflowV} from './scenes/vertical/Scene4WorkflowV';
import {Scene5TechnicalV} from './scenes/vertical/Scene5TechnicalV';
import {Scene6ReviewV} from './scenes/vertical/Scene6ReviewV';
import {Scene7DeliveryV} from './scenes/vertical/Scene7DeliveryV';
import {Scene8SurveyClosingV} from './scenes/vertical/Scene8SurveyClosingV';
import {C, FONT} from './theme';

const SCENES_LANDSCAPE: Record<SceneId, React.FC> = {
  intro: Scene1Intro,
  services: Scene2Services,
  apply: Scene3Apply,
  workflow: Scene4Workflow,
  technical: Scene5Technical,
  review: Scene6Review,
  delivery: Scene7Delivery,
  survey: Scene8SurveyClosing,
};

const SCENES_VERTICAL: Record<SceneId, React.FC> = {
  intro: Scene1IntroV,
  services: Scene2ServicesV,
  apply: Scene3ApplyV,
  workflow: Scene4WorkflowV,
  technical: Scene5TechnicalV,
  review: Scene6ReviewV,
  delivery: Scene7DeliveryV,
  survey: Scene8SurveyClosingV,
};

/**
 * Urutan adegan. Adegan i diperpanjang OVERLAP frame di bawah adegan berikutnya agar transisi masuk
 * memperlihatkan adegan lama. Adegan terakhir tidak diperpanjang, sehingga tidak ada Sequence
 * yang melewati durasi komposisi.
 */
const SceneStack: React.FC<{scenes: Record<SceneId, React.FC>}> = ({scenes}) => (
  <AbsoluteFill style={{backgroundColor: C.navy, fontFamily: FONT}}>
    <GlobalStyles />
    {SCENES.map((s, i) => {
      const Scene = scenes[s.id];
      const isLast = i === SCENES.length - 1;
      return (
        <Sequence key={s.id} name={s.label} from={s.from} durationInFrames={isLast ? s.duration : s.duration + OVERLAP}>
          {isLast ? <Scene /> : (
            <SceneExit duration={s.duration}>
              <Scene />
            </SceneExit>
          )}
        </Sequence>
      );
    })}
    <AudioLayer />
  </AbsoluteFill>
);

/** Format landscape 16:9 (YouTube, presentasi). */
export const RekLaLinPromo: React.FC = () => <SceneStack scenes={SCENES_LANDSCAPE} />;

/** Format vertikal 9:16 (TikTok, Instagram Reels/Stories, YouTube Shorts). */
export const RekLaLinPromoVertical: React.FC = () => <SceneStack scenes={SCENES_VERTICAL} />;
